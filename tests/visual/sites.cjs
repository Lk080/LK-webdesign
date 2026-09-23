'use strict';
const { projects, visualProject } = require('../../scripts/qa-projects.cjs');
module.exports = Object.keys(projects).map(visualProject);
