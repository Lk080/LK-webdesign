'use strict';
try { require('./qa-report.cjs').main('static'); }
catch (error) { console.error(error.message); process.exitCode = 1; }
