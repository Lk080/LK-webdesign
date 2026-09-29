'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const code=fs.readFileSync(require('node:path').join(__dirname,'../docs/analytics.js'),'utf8');
function harness(create,pathname='/contact.html') {
  let consent=false;const listeners={},calls=[];
  const window={LKConsent:{get:()=>({analytics:consent})},LKMeasurementConfig:{provider:{create}},addEventListener:(name,fn)=>{(listeners[name]??=[]).push(fn);},dispatchEvent:event=>(listeners[event.type]||[]).forEach(fn=>fn(event))};
  const document={getElementById:()=>null,addEventListener:()=>{}};
  const context=vm.createContext({window,document,location:{pathname,origin:'http://127.0.0.1:4173'},URL,AbortController,setTimeout,clearTimeout,CustomEvent});
  vm.runInContext(code,context);
  return {window,calls,context,listeners,allow(value){consent=value;window.dispatchEvent({type:'lk:consent-change'});},settle:()=>new Promise(r=>setImmediate(r))};
}
test('analytics is never initialized or queued before consent; initialization once per grant',async()=>{
  let inits=0;const sent=[];const h=harness(()=>{inits++;return{track:(...args)=>sent.push(args),stop(){},clear(){}};});
  assert.equal(h.window.LKAnalytics.track('contact_start',{}),false);await h.settle();assert.equal(inits,0);
  h.allow(true);h.allow(true);await h.settle();assert.equal(inits,1);assert.equal(sent.length,0);
  assert.equal(h.window.LKAnalytics.track('contact_start',{}),true);assert.equal(h.window.LKAnalytics.track('contact_start',{}),false);assert.equal(sent.length,1);h.allow(false);
});
test('allowlist rejects unknown keys, free text, raw URLs, noncategorical values and future events',async()=>{
  const sent=[];const h=harness(()=>({track:(...args)=>sent.push(args),stop(){},clear(){}}));h.allow(true);await h.settle();
  for(const properties of [{location:'footer',email:'a@example.test'},{location:'https://example.test/private'},{location:{name:'Private'}},{location:'footer',referrer:'secret'},[],null])assert.equal(h.window.LKAnalytics.track('email_click',properties),false);
  for(const name of ['website_check_start','website_check_complete','whatsapp_click','page_view','unknown','__proto__'])assert.equal(h.window.LKAnalytics.track(name,{}),false);
  assert.equal(h.window.LKAnalytics.track({email:'private@example.test',toString(){return 'email_click';}},{location:'footer'}),false);
  assert.equal(sent.length,0);assert.equal(h.window.LKAnalytics.track('phone_click',{location:'footer'}),true);assert.equal(sent[0][1].page,'contact');assert.deepEqual(Object.keys(sent[0][1]).sort(),['location','page']);h.allow(false);
});
test('withdrawal during asynchronous init aborts and cleans up late provider without delivery',async()=>{
  let resolve,signal,stops=0,clears=0,tracks=0;const h=harness(input=>{signal=input.signal;return new Promise(r=>resolve=r);});
  h.allow(true);await h.settle();h.allow(false);assert.equal(signal.aborted,true);
  resolve({track(){tracks++;},stop(){stops++;},clear(){clears++;}});await h.settle();assert.equal(stops,1);assert.equal(clears,1);assert.equal(tracks,0);assert.equal(h.window.LKAnalytics.status(),'disabled');
});
test('property accessors and symbol keys cannot bypass the categorical payload boundary',async()=>{
  const sent=[];const h=harness(()=>({track:(...args)=>sent.push(args),stop(){},clear(){}}));h.allow(true);await h.settle();
  let reads=0;const properties={get location(){return ++reads===1?'footer':'private@example.test';}};
  assert.equal(h.window.LKAnalytics.track('email_click',properties),false);assert.equal(reads,0);
  assert.equal(h.window.LKAnalytics.track('email_click',{location:'footer',[Symbol('email')]:'private@example.test'}),false);
  assert.equal(sent.length,0);h.allow(false);
});
test('provider throw/rejection cannot escape the adapter or silently retry within one grant',async()=>{
  for(const create of [()=>{throw Error('blocked');},()=>Promise.reject(Error('blocked'))]){
    const h=harness(create);h.allow(true);await h.settle();assert.equal(h.window.LKAnalytics.status(),'unavailable');assert.equal(h.window.LKAnalytics.track('contact_start',{}),false);h.allow(false);
  }
  const h=harness(()=>({track(){throw Error('blocked');},stop(){throw Error('blocked');},clear(){return Promise.reject(Error('blocked'));}}));h.allow(true);await h.settle();assert.doesNotThrow(()=>h.window.LKAnalytics.track('contact_start',{}));h.allow(false);await h.settle();
});
test('lead requires a confirmed receipt, cannot use generic track, never replays after back/pageshow',async()=>{
  const sent=[];const h=harness(()=>({track:(...args)=>sent.push(args),stop(){},clear(){}}));
  h.window.dispatchEvent({type:'lk:interaction',detail:{name:'contact_submit_success',receipt:1}});h.allow(true);await h.settle();assert.equal(sent.length,0);
  assert.equal(h.window.LKAnalytics.track('generate_lead',{}),false);
  for(const receipt of [undefined,0,-1,'email@example.test',{},1.2])h.window.dispatchEvent({type:'lk:interaction',detail:{name:'contact_submit_success',receipt}});
  assert.equal(sent.length,0);
  for(let i=0;i<2;i++)h.window.dispatchEvent({type:'lk:interaction',detail:{name:'contact_submit_success',receipt:2}});
  h.window.dispatchEvent({type:'pageshow'});assert.equal(sent.length,1);assert.equal(sent[0][0],'generate_lead');assert.deepEqual(Object.keys(sent[0][1]),['page']);h.allow(false);
});
test('duplicate script execution cannot install another adapter/listener',async()=>{
  let inits=0;const h=harness(()=>{inits++;return{track(){},stop(){},clear(){}};});vm.runInContext(code,h.context);assert.equal(h.listeners['lk:interaction'].length,1);h.allow(true);await h.settle();assert.equal(inits,1);h.allow(false);
});
