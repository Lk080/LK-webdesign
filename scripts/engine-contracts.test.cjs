'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {validateWebsite, createWebsiteManifest, validateAudit, auditGate, serializeAudit} = require('./engine-contracts.cjs');
const {assessAudit, approve} = require('./qa-evidence.cjs');
const {getProject} = require('./qa-projects.cjs');
const fixture = require('./fixtures/audit-contract.v1.json');
const fresh = () => structuredClone(fixture);
const asOf = '2026-09-28T11:00:00.000Z';
function requirement(check) {
  return {ruleId: check.ruleId, page: check.page, viewport: check.viewport, state: check.state, evidenceType: check.evidence.type};
}
function policy(audit) { return {projectId: audit.projectId, snapshot: audit.snapshot, required: audit.checks.map(requirement), asOf}; }
function unavailable(audit, availability = 'MISSING') {
  const c = audit.checks[0];
  Object.assign(c, {status: 'DETECTED', outcome: 'NOT_TESTED'});
  Object.assign(c.evidence, {availability, artifact: null, sha256: null, observedAt: null, reason: 'Fixture: no evidence available'});
  Object.assign(c.verification, {result: 'NOT_TESTED', at: null});
  return audit;
}
function limitation() {
  const audit = fresh(), c = audit.checks[0];
  Object.assign(c, {status: 'ACCEPTED_LIMITATION', outcome: 'ACCEPTED_LIMITATION'});
  c.verification.result = 'FAIL';
  c.limitation = {actor: 'human-owner', reviewer: 'Fixture owner', reason: 'Fictitious scoped exception', reviewedAt: '2026-09-28T10:30:00.000Z', expiresAt: '2026-09-29T00:00:00.000Z'};
  return audit;
}
test('website manifest pins infrastructure and resolves existing identity without editing projects', () => {
  const before = JSON.stringify(getProject('lk'));
  const m = createWebsiteManifest('lk', {
    designTokens: {status: 'BOUND', refs: ['docs/style.css'], note: 'Existing project-owned CSS, no shared visual template'},
    forms: {status: 'BOUND', refs: ['docs/contact.js'], note: 'Existing transport; no migration'},
    analytics: {status: 'BOUND', refs: ['docs/script.js'], note: 'Local interaction hooks only; no production analytics'},
    qa: {status: 'BOUND', refs: ['scripts/qa-projects.json'], note: 'Existing runners remain authoritative'}
  });
  assert.equal(m.engineVersion, '1.0.0');
  assert.equal(m.bindings.consent.status, 'UNBOUND');
  for (const binding of Object.values(m.bindings)) for (const ref of binding.refs) assert(fs.existsSync(path.join(__dirname, '..', ref)));
  assert.equal(validateWebsite(JSON.parse(JSON.stringify(m))).projectId, 'lk');
  assert.equal(JSON.stringify(getProject('lk')), before);
  assert.throws(() => createWebsiteManifest('unregistered-client'), /project/);
  const customer = structuredClone(m); customer.projectId = 'fixture-client';
  assert.equal(validateWebsite(customer).projectId, 'fixture-client'); // Portable shape; real onboarding must register it locally.
  for (const mutate of [x => x.engineVersion = '9.0.0', x => x.bindings.forms.refs = [], x => x.bindings.forms.refs = ['../private.json'], x => x.bindings.unknown = {}, x => x.projectId = null]) {
    const invalid = structuredClone(m); mutate(invalid); assert.throws(() => validateWebsite(invalid));
  }
});
test('A: verified passing result survives deterministic roundtrip without invented scores', () => {
  const audit = fresh();
  assert.equal(auditGate(audit, policy(audit)).status, 'PASS');
  assert.deepEqual(JSON.parse(serializeAudit(audit)), audit);
  assert(!('score' in audit));
});
test('B: critical failure cannot disappear behind passing observations', () => {
  const audit = fresh(), c = structuredClone(audit.checks[0]);
  Object.assign(c, {ruleId: 'lk.critical-flows.form-delivery', category: 'critical-flows', severity: 'CRITICAL', status: 'CONFIRMED', outcome: 'FAIL'});
  c.verification.result = 'FAIL'; audit.checks.push(c);
  assert.equal(auditGate(audit, policy(audit)).status, 'FAIL');
  c.remediationSafety = 'LEVEL_3_LOW_RISK_AUTOFIX_CANDIDATE';
  assert.equal(auditGate(audit, policy(audit)).status, 'FAIL'); // Classification is not permission to repair or waive.
});
test('C/H: missing, unavailable, empty and omitted required evidence never become PASS', () => {
  for (const availability of ['MISSING', 'UNAVAILABLE']) {
    const audit = unavailable(fresh(), availability);
    assert.equal(auditGate(audit, policy(audit)).status, 'NOT_TESTED');
    audit.checks[0].outcome = 'PASS';
    assert.throws(() => validateAudit(audit), /missing evidence/);
  }
  const audit = fresh(), expected = policy(audit);
  audit.checks = [];
  assert.equal(auditGate(audit, expected).status, 'NOT_TESTED');
  assert.equal(auditGate(fresh(), {...expected, required: []}).status, 'NOT_TESTED');
  const missingViewport = structuredClone(expected.required[0]); missingViewport.viewport = 'mobile-chromium';
  assert.equal(auditGate(fresh(), {...expected, required: [...expected.required, missingViewport]}).status, 'NOT_TESTED');
});
test('D: accepted limitations stay visible, require owner context and expire', () => {
  const audit = limitation();
  assert.equal(auditGate(audit, policy(audit)).status, 'ACCEPTED_LIMITATION');
  assert.equal(auditGate(audit, {...policy(audit), asOf: '2026-09-30T00:00:00.000Z'}).status, 'REVIEW_REQUIRED');
  audit.checks[0].limitation.actor = 'automation';
  assert.throws(() => validateAudit(audit), /owner limitation/);
});
test('E: field, lab, automated, manual and business evidence cannot substitute for one another', () => {
  const audit = fresh(), c = audit.checks[0];
  c.evidence.type = 'LAB';
  const expected = policy(audit); expected.required[0].evidenceType = 'FIELD';
  assert.equal(auditGate(audit, expected).status, 'NOT_TESTED');
  c.evidence.type = 'FIELD';
  assert.throws(() => validateAudit(audit), /field window/);
  c.evidence.window = {start: '2026-08-31T00:00:00.000Z', end: '2026-09-28T00:00:00.000Z'};
  assert.equal(auditGate(audit, expected).status, 'PASS');
  c.evidence.type = 'LAB'; assert.throws(() => validateAudit(audit), /field window/);
  c.evidence.window = null;
  for (const type of ['LAB', 'LK_AUTOMATED', 'MANUAL', 'BUSINESS_OBSERVATION']) {
    c.evidence.type = type;
    assert.equal(auditGate(audit, policy(audit)).status, 'PASS');
    assert.equal(auditGate(audit, expected).status, 'NOT_TESTED');
  }
});
test('F/G: invalid enums, confidence, missing/unknown versions and score extensions are rejected', () => {
  for (const mutate of [
    x => x.checks[0].severity = 'URGENT', x => x.checks[0].status = 'DONE',
    x => x.checks[0].outcome = 'SKIP', x => x.checks[0].confidence = 2,
    x => x.checks[0].remediationSafety = 'AUTOFIX_NOW', x => x.checks[0].category = 'magic-ranking',
    x => delete x.methodologyVersion, x => x.methodologyVersion = '2.0.0',
    x => x.contractVersion = '2.0.0', x => x.overallScore = 100,
    x => x.checks[0].evidence.type = 'LAB_AND_FIELD', x => x.checks[0].evidence.sha256 = null,
    x => x.checks[0].page = 'https://fixture.invalid/?email=private',
    x => x.checks[0].page = 'https://owner:secret@fixture.invalid/'
  ]) { const audit = fresh(); mutate(audit); assert.throws(() => validateAudit(audit)); }
});
test('FIXED needs re-verification; duplicate scope and premature PASS are rejected', () => {
  const audit = fresh(), c = audit.checks[0];
  c.status = 'FIXED'; assert.throws(() => validateAudit(audit), /PASS requires/);
  c.outcome = 'REVIEW_REQUIRED'; c.verification = {method: 'Re-run after fix', result: 'NOT_TESTED', at: null};
  assert.equal(auditGate(audit, policy(audit)).status, 'REVIEW_REQUIRED');
  audit.checks.push(structuredClone(c)); assert.throws(() => validateAudit(audit), /duplicate/);
});
test('gate rejects stale/foreign context, future evidence and missing policy', () => {
  const audit = fresh(), expected = policy(audit);
  assert.equal(auditGate(audit, {...expected, projectId: 'another-client'}).status, 'REVIEW_REQUIRED');
  assert.equal(auditGate(audit, {...expected, snapshot: {...audit.snapshot, source: '9'.repeat(64)}}).status, 'REVIEW_REQUIRED');
  assert.equal(auditGate(audit, {...expected, asOf: '2026-09-28T09:00:00.000Z'}).status, 'REVIEW_REQUIRED');
  assert.throws(() => auditGate(audit, {...expected, required: null}));
});
test('I: canonical serialization ignores object insertion order and does not mutate input', () => {
  const audit = fresh(), before = JSON.stringify(audit);
  function reverse(value) {
    if (Array.isArray(value)) return value.map(reverse);
    if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).reverse().map(k => [k, reverse(value[k])]));
    return value;
  }
  assert.equal(serializeAudit(audit), serializeAudit(reverse(audit)));
  assert.equal(JSON.stringify(audit), before);
  assert.equal(serializeAudit(JSON.parse(serializeAudit(audit))), serializeAudit(audit));
  const sparse = fresh(); sparse.checks = new Array(1);
  assert.throws(() => serializeAudit(sparse), /dense JSON/);
  const nonJSON = fresh(); nonJSON.snapshot.environment.tool = undefined;
  assert.throws(() => serializeAudit(nonJSON), /JSON data/);
});
test('optional audit consumer can only restrict existing QA; owner approval stays separate', () => {
  const audit = fresh(); audit.projectId = 'lk';
  const project = getProject('lk'), snapshot = audit.snapshot;
  const entries = project.qa.required.flatMap(check => (project.qa.requiredViewports[check] || [null]).map(viewport => ({project: 'lk', check, viewport, result: 'PASS', snapshot})));
  const consume = (data = audit, qa = entries) => assessAudit(qa, 'lk', snapshot, data, policy(audit).required, asOf);
  const status = consume();
  assert.equal(status.technicalStatus, 'TECHNICAL_GATE_PASS');
  assert.equal(status.deliveryStatus, 'OWNER_REVIEW_PENDING');
  assert.throws(() => approve(status, null, snapshot));
  assert.equal(consume(audit, []).technicalStatus, 'TECHNICAL_GATE_INCOMPLETE');
  for (const result of ['FAIL', 'SKIP']) assert.equal(consume(audit, entries.map(e => ({...e, result}))).technicalStatus, 'TECHNICAL_GATE_INCOMPLETE');
  assert.equal(consume(unavailable(structuredClone(audit))).technicalStatus, 'TECHNICAL_GATE_INCOMPLETE');
  const limited = limitation(); limited.projectId = 'lk';
  assert.equal(consume(limited).audit.status, 'ACCEPTED_LIMITATION');
  assert.equal(consume(limited).technicalStatus, 'TECHNICAL_GATE_INCOMPLETE');
  assert.equal(consume(limited).deliveryStatus, 'NOT_READY');
});
