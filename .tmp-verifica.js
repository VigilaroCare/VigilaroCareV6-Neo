// Verificacao independente: identificador referenciado e NAO declarado.
// E o unico jeito de provar que a remocao de imports nao quebrou nada —
// o bundle do Metro nao acusa variavel indefinida.
const fs=require('fs'),path=require('path');
const parser=require('@babel/parser');
const tm=require('@babel/traverse');const traverse=tm.default||tm;
const GLOBAIS=new Set(['console','require','module','exports','process','global','globalThis','__DEV__','__dirname','__filename','setTimeout','clearTimeout','setInterval','clearInterval','setImmediate','requestAnimationFrame','cancelAnimationFrame','fetch','Headers','Request','Response','FormData','Blob','File','FileReader','XMLHttpRequest','WebSocket','AbortController','Promise','Math','JSON','Object','Array','String','Number','Boolean','Date','Error','TypeError','RangeError','Map','Set','WeakMap','WeakSet','RegExp','Intl','URL','URLSearchParams','TextEncoder','TextDecoder','isNaN','isFinite','parseInt','parseFloat','encodeURIComponent','decodeURIComponent','encodeURI','decodeURI','structuredClone','queueMicrotask','performance','navigator','window','document','alert','Symbol','Proxy','Reflect','BigInt','Infinity','NaN','undefined','atob','btoa','crypto','Buffer','jest','describe','it','expect','beforeEach','afterEach']);
const arqs=[];
for(const r of ['screens','components','services','utils','hooks','context','contexts','navigation','data'])
 (function a(d){if(!fs.existsSync(d))return;for(const e of fs.readdirSync(d,{withFileTypes:true})){const q=path.join(d,e.name);if(e.isDirectory())a(q);else if(e.name.endsWith('.js'))arqs.push(q);}})(r);
arqs.push('App.js');
let problemas=0,lidos=0;
for(const f of arqs){
 let ast;try{ast=parser.parse(fs.readFileSync(f,'utf8'),{sourceType:'module',plugins:['jsx']});}catch(e){console.log('PARSE FALHOU '+f+': '+e.message);problemas++;continue;}
 lidos++;
 traverse(ast,{Program(p){
   for(const nome of Object.keys(p.scope.globals||{})){
     if(GLOBAIS.has(nome))continue;
     console.log('INDEFINIDO  '+f+'  ->  '+nome);problemas++;
   }
 }});
}
console.log('\narquivos analisados: '+lidos+'   problemas: '+problemas);
