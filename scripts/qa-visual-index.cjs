'use strict';
try { require('./qa-report.cjs').main('visual'); }
catch (error) { console.error(error.message); process.exitCode = 1; }
