'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { getProject } = require('./qa-projects.cjs');
const { snapshot } = require('./qa-state.cjs');
const { collect } = require('./qa-report.cjs');
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function evidence(ctx, check, state, viewport, result, artifact) {
  if (!fs.existsSync(artifact)) throw Error(`Missing artifact: ${artifact}`);
  return { project: ctx.metadata.project, runId: ctx.metadata.runId, check, state, viewport: viewport || null,
    snapshot: ctx.metadata.snapshot, result, artifact: path.relative(ctx.dir, artifact), artifactHash: hash(artifact),
    reuse: { status: 'FRESH', reason: null }, recordedAt: new Date().toISOString() };
}
function browserResults(report) {
  const rows = [];
  function visit(suite) {
    for (const spec of suite.specs || []) for (const test of spec.tests) {
      const result = test.results.at(-1);
      rows.push({ state: spec.title, viewport: test.projectName, result: test.status === 'expected' && result?.status === 'passed' ? 'PASS' : result?.status === 'skipped' ? 'SKIP' : 'FAIL' });
    }
    for (const child of suite.suites || []) visit(child);
  }
  for (const suite of report.suites || []) visit(suite);
  return rows;
}
function readEvidence(ctx, job) {
  const check = job.check;
  const browser = ['smoke','functional','axe','visual'].includes(check);
  if (browser) {
    const file = path.join(ctx.dir, `${check}.json`);
    const report = JSON.parse(fs.readFileSync(file));
    if (report.config?.metadata?.runId !== ctx.metadata.runId) throw Error('Browser report scope mismatch');
    const entries = browserResults(report).map(r => evidence(ctx, check, r.state, r.viewport, r.result, file));
    if (!entries.length) throw Error('No execution evidence');
    if (check === 'axe') {
      for (const r of collect(ctx.dir,ctx.metadata.project,'axe').reports) entries.push(evidence(ctx,check,r.state,r.viewport,r.violations.some(v=>['critical','serious'].includes(v.impact))?'FAIL':'PASS',path.join(ctx.dir,r.file)));
    }
    if (check === 'visual') {
      for (const r of collect(ctx.dir,ctx.metadata.project,'visual').reports) for (const shot of r.screenshots) entries.push(evidence(ctx,check,shot.name,r.viewport,entries.some(e=>e.viewport===r.viewport&&e.result==='FAIL')?'FAIL':'PASS',path.join(ctx.dir,path.dirname(r.file),shot.file)));
    }
    return entries;
  }
  const directory = path.join(ctx.dir, check);
  if (check === 'lighthouse') {
    return ['desktop','mobile'].map(mode=>{
      const file=path.join(directory,ctx.metadata.project,mode,'summary.json');const r=JSON.parse(fs.readFileSync(file));
      if(r.metadata?.runId!==ctx.metadata.runId)throw Error('Lighthouse scope mismatch');
      return evidence(ctx,check,'page',mode,Object.values(r.scores).every(s=>s.met)&&!r.failedRequests.length&&!r.unexpectedRequests?.length?'PASS':'FAIL',file);
    });
  }
  const checks = check === 'static' ? ['html','css','js','links'] : [check];
  return checks.map(tool=>{
    const file=path.join(directory,`${tool}.json`);const r=JSON.parse(fs.readFileSync(file));
    if(r.metadata?.runId!==ctx.metadata.runId)throw Error('Static scope mismatch');
    return evidence(ctx,check,tool,null,r.findings.some(f=>f.classification==='ERROR')?'FAIL':'PASS',file);
  });
}
function assess(entries, project, current, required = getProject(project).qa.required) {
  const coherent = entries.length > 0 && entries.every(e=>e.project===project && JSON.stringify(e.snapshot)===JSON.stringify(current));
  const missing = required.filter(check=>!entries.some(e=>e.check===check&&e.result==='PASS'));
  for (const [check, viewports] of Object.entries(getProject(project).qa.requiredViewports)) {
    if (required.includes(check)) for (const viewport of viewports) {
      if (!entries.some(e => e.check === check && e.viewport === viewport && e.result === 'PASS')) missing.push(`${check}/${viewport}`);
    }
  }
  const technical = coherent && !missing.length && entries.every(e=>['PASS','SKIP'].includes(e.result));
  return { executionStatus: entries.length ? 'CHECKS_COMPLETED' : 'NO_EVIDENCE', technicalStatus: technical ? 'TECHNICAL_GATE_PASS' : 'TECHNICAL_GATE_INCOMPLETE',
    deliveryStatus: technical ? 'OWNER_REVIEW_PENDING' : 'NOT_READY', publication: getProject(project).publication, missing, coherent };
}
function reuseEvidence(entry, previousDir, current, reason) {
  if (!reason?.trim() || entry.result !== 'PASS' || JSON.stringify(entry.snapshot)!==JSON.stringify(current)) throw Error('Reuse requires matching state and explicit justification');
  const file=path.resolve(previousDir,entry.artifact);
  if(hash(file)!==entry.artifactHash)throw Error('Reuse artifact changed');
  return {...entry,artifact:file,reuse:{status:'REUSED',reason,sourceRun:entry.runId}};
}
function approve(status, approval, current) {
  if(status.technicalStatus!=='TECHNICAL_GATE_PASS'||approval?.decision!=='approve'||!approval?.reviewer||!approval?.reviewedAt||!approval?.evidence||approval?.actor!=='human-owner'||JSON.stringify(approval.snapshot)!==JSON.stringify(current))throw Error('Explicit human owner approval for this exact state required');
  return {...status,deliveryStatus:'DELIVERY_APPROVED',approval};
}
function finish(ctx, jobs, results) {
  const entries=[], errors=[];
  for (const job of jobs) { try { entries.push(...readEvidence(ctx,job)); } catch(error) { errors.push(`${job.check}: ${error.message}`); } }
  const current=snapshot(ctx.metadata.project);
  const status=assess(entries,ctx.metadata.project,current);
  if(errors.length || results.some(r=>r.exitCode!==0)) { status.executionStatus='CHECKS_FAILED';status.technicalStatus='TECHNICAL_GATE_INCOMPLETE';status.deliveryStatus='NOT_READY'; }
  const report={metadata:ctx.metadata,...status,entries,errors,results};
  fs.writeFileSync(path.join(ctx.dir,'evidence.json'),JSON.stringify(report,null,2));
  return report;
}
module.exports={evidence,browserResults,readEvidence,assess,reuseEvidence,approve,finish};
