'use strict';
// Pure local contracts: no scanner, filesystem/network access, repair or deployment.
const website = require('./contracts/website.v1.json');
const methodology = require('./contracts/audit-methodology.v1.json');
function ensure(condition, message) { if (!condition) throw Error(`Engine contract: ${message}`); }
function object(value) { return value !== null && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype; }
function text(value) { return typeof value === 'string' && value.trim().length > 0; }
function fields(value, names, label) {
  ensure(object(value) && Object.keys(value).length === names.length && names.every(k => Object.hasOwn(value, k)), `${label} fields`);
}
function member(value, values, label) { ensure(values.includes(value), label); }
function timestamp(value) {
  return typeof value === 'string' && Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value;
}
function hash(value) { return typeof value === 'string' && /^[a-f0-9]{64}$/.test(value); }
function localRef(value) {
  return text(value) && /^[a-zA-Z0-9_. /-]+$/.test(value) && !value.startsWith('/') && !value.split('/').some(p => !p || p === '.' || p === '..');
}
function pageRef(value) {
  if (!text(value) || /[?#\s\\]/.test(value)) return false;
  if (value.startsWith('/') && !value.startsWith('//')) return true;
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password; } catch { return false; }
}
function canonical(value) {
  if (value === null || typeof value === 'boolean' || typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value))) return JSON.stringify(value);
  if (Array.isArray(value)) {
    ensure(Object.keys(value).length === value.length, 'dense JSON arrays required');
    for (let i = 0; i < value.length; i++) ensure(Object.hasOwn(value, i), 'dense JSON arrays required');
    return `[${value.map(canonical).join(',')}]`;
  }
  ensure(object(value), 'only JSON data is supported');
  return `{${Object.keys(value).sort().map(k => `${JSON.stringify(k)}:${canonical(value[k])}`).join(',')}}`;
}
function validateWebsite(manifest) {
  fields(manifest, ['contractVersion', 'engineVersion', 'projectId', 'registry', 'bindings'], 'website');
  ensure(manifest.contractVersion === website.contractVersion && manifest.engineVersion === website.engineVersion, 'unsupported website version');
  ensure(typeof manifest.projectId === 'string' && /^[a-z][a-z-]*$/.test(manifest.projectId) && manifest.registry === website.registry, 'project reference');
  fields(manifest.bindings, Object.keys(website.areas), 'bindings');
  for (const binding of Object.values(manifest.bindings)) {
    fields(binding, ['status', 'refs', 'note'], 'binding');
    member(binding.status, website.bindingStatuses, 'binding status');
    ensure(text(binding.note) && Array.isArray(binding.refs) && binding.refs.every(localRef), 'binding references/note');
    ensure(binding.status === 'BOUND' ? binding.refs.length > 0 : binding.refs.length === 0, 'bound references required; unbound references must be empty');
  }
  return manifest;
}
function createWebsiteManifest(projectId, bindings = {}) {
  // Identity, routes, publication, freeze, targets and QA stay owned by the registry.
  require('./qa-projects.cjs').getProject(projectId);
  const defaults = Object.fromEntries(Object.keys(website.areas).map(key => [key, {status: 'UNBOUND', refs: [], note: 'Mapping not declared; this is not a conformance claim.'}]));
  return validateWebsite({contractVersion: website.contractVersion, engineVersion: website.engineVersion, projectId, registry: website.registry, bindings: {...defaults, ...structuredClone(bindings)}});
}
function validateSnapshot(snapshot) {
  fields(snapshot, ['source', 'configuration', 'baselines', 'environment'], 'snapshot');
  ensure(['source', 'configuration', 'baselines'].every(k => hash(snapshot[k])) && object(snapshot.environment) && Object.keys(snapshot.environment).length > 0, 'snapshot provenance');
  canonical(snapshot.environment);
}
function scopeKey(check) { return canonical([check.ruleId, check.page, check.viewport, check.state, check.evidenceType ?? check.evidence.type]); }
function validateScope(scope) {
  ensure(typeof scope.ruleId === 'string' && /^lk\.[a-z0-9-]+\.[a-z0-9.-]+$/.test(scope.ruleId), 'stable ruleId');
  ensure(pageRef(scope.page) && (scope.viewport === null || text(scope.viewport)) && text(scope.state), 'page/viewport/state');
}
function validateCheck(check) {
  fields(check, ['ruleId', 'category', 'severity', 'confidence', 'page', 'location', 'viewport', 'state', 'explanation', 'businessExplanation', 'recommendedAction', 'evidence', 'verification', 'remediationSafety', 'status', 'outcome', 'limitation'], 'check');
  validateScope(check);
  for (const [key, values] of [['category', methodology.categories], ['severity', methodology.severities], ['status', methodology.statuses], ['outcome', methodology.outcomes], ['remediationSafety', methodology.remediationSafety]]) member(check[key], values, key);
  ensure(check.confidence === null || (Number.isFinite(check.confidence) && check.confidence >= 0 && check.confidence <= 1), 'confidence');
  ensure(['explanation', 'businessExplanation', 'recommendedAction'].every(k => text(check[k])), 'explanations/action');
  fields(check.location, ['selector', 'resource', 'line'], 'location');
  ensure(['selector', 'resource'].every(k => check.location[k] === null || text(check.location[k])) && (check.location.line === null || (Number.isInteger(check.location.line) && check.location.line > 0)), 'location values');
  const e = check.evidence, v = check.verification;
  fields(e, ['type', 'availability', 'artifact', 'sha256', 'observedAt', 'producer', 'window', 'reason'], 'evidence');
  member(e.type, methodology.evidenceTypes, 'evidence type');
  member(e.availability, methodology.availability, 'evidence availability');
  ensure(text(e.producer), 'evidence producer/version or reviewer');
  fields(v, ['method', 'result', 'at'], 'verification');
  ensure(text(v.method), 'verification method');
  member(v.result, ['PASS', 'FAIL', 'NOT_TESTED'], 'verification result');
  ensure(v.result === 'NOT_TESTED' ? v.at === null : timestamp(v.at), 'verification timestamp');
  if (e.availability === 'AVAILABLE') {
    ensure(localRef(e.artifact) && hash(e.sha256) && timestamp(e.observedAt) && e.reason === null, 'available evidence provenance');
    ensure(v.at === null || v.at >= e.observedAt, 'verification precedes observation');
    if (e.type === 'FIELD') {
      fields(e.window, ['start', 'end'], 'field window');
      ensure(timestamp(e.window.start) && timestamp(e.window.end) && e.window.start < e.window.end && e.window.end <= e.observedAt, 'field observation window');
    } else ensure(e.window === null, 'field window cannot label lab/manual/automated evidence');
    ensure(check.outcome !== 'NOT_TESTED', 'available observation needs an explicit outcome');
  } else {
    ensure(e.artifact === null && e.sha256 === null && e.observedAt === null && e.window === null && text(e.reason), 'missing evidence must remain explicit');
    ensure(check.outcome === 'NOT_TESTED' && check.status === 'DETECTED' && v.result === 'NOT_TESTED', 'missing evidence cannot imply verification');
  }
  if (check.outcome === 'PASS' || check.status === 'VERIFIED') ensure(check.outcome === 'PASS' && check.status === 'VERIFIED' && v.result === 'PASS' && e.availability === 'AVAILABLE', 'PASS requires verified evidence');
  if (check.status === 'FIXED') ensure(check.outcome === 'REVIEW_REQUIRED' && v.result === 'NOT_TESTED', 'FIXED is not VERIFIED');
  if (check.outcome === 'FAIL') ensure(['DETECTED', 'CONFIRMED', 'PLANNED'].includes(check.status) && v.result !== 'PASS', 'failure lifecycle');
  if (check.status === 'ACCEPTED_LIMITATION' || check.outcome === 'ACCEPTED_LIMITATION') {
    ensure(check.status === 'ACCEPTED_LIMITATION' && check.outcome === 'ACCEPTED_LIMITATION' && e.availability === 'AVAILABLE', 'limitation outcome');
    fields(check.limitation, ['actor', 'reviewer', 'reason', 'reviewedAt', 'expiresAt'], 'limitation');
    const l = check.limitation;
    ensure(l.actor === 'human-owner' && text(l.reviewer) && text(l.reason) && timestamp(l.reviewedAt) && timestamp(l.expiresAt) && l.reviewedAt < l.expiresAt && l.reviewedAt >= e.observedAt, 'explicit scoped owner limitation');
  } else ensure(check.limitation === null, 'unexpected limitation');
}
function validateAudit(audit) {
  canonical(audit); // Reject non-JSON values instead of silently dropping them during serialization.
  fields(audit, ['contractVersion', 'methodologyVersion', 'projectId', 'snapshot', 'checks'], 'audit');
  ensure(audit.contractVersion === methodology.contractVersion && audit.methodologyVersion === methodology.methodologyVersion, 'unsupported/missing methodology or contract version');
  ensure(typeof audit.projectId === 'string' && /^[a-z][a-z-]*$/.test(audit.projectId), 'audit project');
  validateSnapshot(audit.snapshot);
  ensure(Array.isArray(audit.checks), 'checks');
  audit.checks.forEach(validateCheck);
  ensure(new Set(audit.checks.map(scopeKey)).size === audit.checks.length, 'duplicate check scope');
  return audit;
}
function auditGate(audit, policy) {
  validateAudit(audit);
  fields(policy, ['projectId', 'snapshot', 'required', 'asOf'], 'gate policy');
  validateSnapshot(policy.snapshot);
  ensure(text(policy.projectId) && timestamp(policy.asOf) && Array.isArray(policy.required), 'gate context');
  for (const requirement of policy.required) {
    fields(requirement, ['ruleId', 'page', 'viewport', 'state', 'evidenceType'], 'required scope');
    validateScope(requirement); member(requirement.evidenceType, methodology.evidenceTypes, 'required evidence type');
  }
  ensure(new Set(policy.required.map(scopeKey)).size === policy.required.length, 'duplicate required scope');
  if (audit.projectId !== policy.projectId || canonical(audit.snapshot) !== canonical(policy.snapshot)) return {status: 'REVIEW_REQUIRED', reasons: ['Project or snapshot mismatch']};
  const reasons = policy.required.filter(r => !audit.checks.some(c => scopeKey(c) === scopeKey(r))).map(r => `Missing ${scopeKey(r)}`);
  if (!policy.required.length) reasons.push('Required coverage not declared');
  if (audit.checks.some(c => c.outcome === 'FAIL')) return {status: 'FAIL', reasons: [...reasons, 'Failing observation remains']};
  if (reasons.length || audit.checks.some(c => c.outcome === 'NOT_TESTED')) return {status: 'NOT_TESTED', reasons: [...reasons, 'Coverage/evidence incomplete']};
  if (audit.checks.some(c => c.outcome === 'REVIEW_REQUIRED' || c.evidence.observedAt > policy.asOf || c.verification.at > policy.asOf || (c.limitation && (c.limitation.reviewedAt > policy.asOf || c.limitation.expiresAt <= policy.asOf)))) return {status: 'REVIEW_REQUIRED', reasons: ['Review, re-audit or renewed limitation decision required']};
  if (audit.checks.some(c => c.outcome === 'ACCEPTED_LIMITATION')) return {status: 'ACCEPTED_LIMITATION', reasons: ['Owner limitation remains visible; not PASS']};
  return {status: 'PASS', reasons: []};
}
function serializeAudit(audit) { validateAudit(audit); return canonical(audit) + '\n'; }
module.exports = { validateWebsite, createWebsiteManifest, validateAudit, auditGate, serializeAudit };
