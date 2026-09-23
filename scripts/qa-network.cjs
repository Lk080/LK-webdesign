'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { getProject } = require('./qa-projects.cjs');
const manifest = require('../tests/visual/assets/manifest.json');
const origin = 'http://127.0.0.1:4173';
function decision(address, method, id, mode = 'fixtures') {
  const project = getProject(id);
  const url = new URL(address);
  if (url.username || url.password) return { action:'reject', reason:'URL credentials forbidden' };
  if (url.hostname === 'formspree.io' || url.hostname.endsWith('.formspree.io')) return {action:'mock-form',reason:'Never contact Formspree'};
  if (!['GET','HEAD'].includes(method)) return {action:'reject',reason:'Non-read network request'};
  if (url.origin === origin) return {action:'continue'};
  if (mode === 'fixtures' && project.network.fixtures.includes(url.href) && manifest[url.href]) return {action:'fixture',...manifest[url.href]};
  if (mode === 'live' && project.network.liveReadOrigins.includes(url.origin)) return {action:'continue'};
  return {action:'reject',reason:'Unexpected external dependency'};
}
async function playwrightRoute(route, project, events) {
  const request=route.request();const choice=decision(request.url(),request.method(),project);
  if(choice.action==='continue')return route.continue();
  events.push({url:request.url(),method:request.method(),...choice});
  if(choice.action==='mock-form')return route.fulfill({status:200,contentType:'application/json',body:'{"ok":true,"qaMock":true}'});
  if(choice.action==='fixture')return route.fulfill({contentType:choice.contentType,body:fs.readFileSync(path.join(__dirname,'../tests/visual/assets',choice.file))});
  return route.abort('blockedbyclient');
}
module.exports={origin,decision,playwrightRoute};
