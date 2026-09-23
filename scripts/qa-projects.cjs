'use strict';
// Project-specific selectors stay data, never generic page-design rules.
const entries = require('./qa-projects.json');
if (new Set(entries.map(project => project.id)).size !== entries.length) throw Error('Duplicate project IDs');
const projects = Object.fromEntries(entries.map(project => [project.id, project]));
function getProject(id) {
  if (!Object.hasOwn(projects, id)) throw Error(`Kies expliciet project: ${Object.keys(projects).join(', ')}`);
  return projects[id];
}
function assertRunnable(id) {
  const project = getProject(id);
  if (project.frozen) throw Error(`${id} is bevroren; uitvoering en referentieacceptatie geweigerd.`);
  return project;
}
function visualProject(id) {
  const project = getProject(id);
  return { id, path: project.route, name: project.name, ...project.visual };
}
for (const project of Object.values(projects)) {
  if (!/^[a-z][a-z-]*$/.test(project.id) || typeof project.frozen !== 'boolean') throw Error('Invalid project identity/freeze');
  if (!project.source.startsWith('docs') || project.source.split('/').includes('..')) throw Error('Invalid project source');
  if (!project.route.startsWith('/') || !project.route.endsWith('/') || project.route.includes('..')) throw Error('Invalid project route');
  if (!['draft', 'portfolio-demo', 'published'].includes(project.publication.phase)) throw Error('Invalid publication phase');
  for (const value of Object.values(project.qa.budgets)) if (!Number.isFinite(value) || value < 0) throw Error('Invalid project budget');
  for (const target of Object.values(project.qa.targets)) if (!Number.isFinite(target) || target < 0 || target > 100) throw Error('Invalid Lighthouse target');
}
module.exports = { projects, getProject, assertRunnable, visualProject };
