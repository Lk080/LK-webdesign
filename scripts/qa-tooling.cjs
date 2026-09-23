'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { ESLint } = require('eslint');
const { context, reserve, stamp } = require('./qa-run.cjs');
async function main() {
  const ctx=context(process.argv[2],'tooling'),output=reserve(ctx,'tooling');
  const results=await new ESLint({fix:false, ignorePatterns:['scripts/qa-visual-fonts.cjs']}).lintFiles(['scripts/**/*.{cjs,mjs}','tests/**/*.cjs','playwright*.cjs','eslint.config.cjs','stylelint.config.mjs']);
  const findings=results.flatMap(r=>r.messages.map(m=>({file:r.filePath,line:m.line,rule:m.ruleId,classification:m.severity===2?'ERROR':'WARNING',message:m.message})));
  fs.writeFileSync(path.join(output,'tooling.json'),JSON.stringify(stamp(ctx,'tooling',{tool:'tooling',findings}),null,2));
  console.log(JSON.stringify({run:ctx.dir,errors:findings.filter(f=>f.classification==='ERROR').length,warnings:findings.filter(f=>f.classification==='WARNING').length}));
  process.exitCode=results.some(r=>r.errorCount)?1:0;
}
main().catch(error=>{console.error(error);process.exitCode=1;});
