'use strict';
try { require('./qa-report.cjs').main('axe'); }
catch (error) { console.error(error.message); process.exitCode = 1; }
