import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
async function check(dir) {
 for(const entry of await fs.readdir(dir,{withFileTypes:true})) {
  const file=dir+'/'+entry.name;
  if(entry.isDirectory()) await check(file);
  else if(/\.(tsx?|mjs|html|txt|svg|vtt)$/.test(file)) {
   const text=await fs.readFile(file,'utf8');
   assert.ok(!/docs\.google\.com\/spreadsheets\/d\//.test(text),'Private spreadsheet link: '+file);
   assert.ok(!/script\.google\.com\/(?:home|macros)/.test(text),'Internal automation URL: '+file);
   assert.ok(!/-----BEGIN (?:RSA |OPENSSH )?PRIVATE KEY-----/.test(text),'Private key: '+file);
  }
 }
}
await check('src'); await check('public');
console.log('Public content checks passed');
