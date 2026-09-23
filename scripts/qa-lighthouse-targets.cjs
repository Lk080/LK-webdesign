'use strict';
function evaluate(lhr, targets) {
  const scores = Object.fromEntries(Object.entries(targets).map(([key,target]) => {
    const value=lhr.categories?.[key]?.score;
    return [key,{score:Number.isFinite(value)?Math.round(value*100):null,target,met:Number.isFinite(value)&&value*100>=target}];
  }));
  return { scores, targetStatus:Object.values(scores).every(s=>s.met)?'TARGETS_MET':'BELOW_TARGET', belowTarget:Object.keys(scores).filter(k=>!scores[k].met) };
}
module.exports={evaluate};
