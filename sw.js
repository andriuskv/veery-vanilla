if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise(async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()})),r.then(()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]})},r=(r,i)=>{Promise.all(r.map(e)).then(e=>i(1===e.length?e[0]:e))},i={require:Promise.resolve(r)};self.define=(r,s,c)=>{i[r]||(i[r]=Promise.resolve().then(()=>{let i={};const n={uri:location.origin+r.slice(1)};return Promise.all(s.map(r=>{switch(r){case"exports":return i;case"module":return n;default:return e(r)}})).then(e=>{const r=c(...e);return i.default||(i.default=r),i})}))}}define("./sw.js",["./workbox-d9851aed"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"2.js",revision:"02d87f9a6d37304ea320208eb07fa190"},{url:"android-chrome-192x192.png",revision:"d1677e36fc6b8cdf11f715ba22e10168"},{url:"android-chrome-512x512.png",revision:"a1fc338658eb3e26291ad5c2e026346a"},{url:"apple-touch-icon.png",revision:"2de65521d3becdaefd17a71c192f866b"},{url:"assets/images/album-art-placeholder.png",revision:"9c4de475997adfd018e027d6484cb5b9"},{url:"assets/images/logo.svg",revision:"0b4c4a8d9171d2c55dea51930b7792cf"},{url:"assets/images/spinner.svg",revision:"d793de2eeebab757da7fa79766532be8"},{url:"favicon-16x16.png",revision:"30e806374c4b073f3c197ff2fa10dfb2"},{url:"favicon-32x32.png",revision:"7114c444608a1a9583c33630f060756b"},{url:"favicon.ico",revision:"efe5895affcea184f636cb7acd02a03d"},{url:"index.html",revision:"87129ae56f9130158ebe05b08d980825"},{url:"libs/dexie.min.js",revision:"31d552df6f1f472f7223cc088f289d38"},{url:"main.css",revision:"aca3bf1096404d251a5c1a590f107fa8"},{url:"main.js",revision:"721b253f557ebfc68dcc53635cccb82a"},{url:"manifest.json",revision:"257140ce14eae9b061a8cf725520d6cf"},{url:"vendor.css",revision:"6c1786bc6bc463289ce8ee919379ccab"},{url:"vendor.js",revision:"fb0a12ce50c2a02b47ef1f36526bd8a1"},{url:"ww.js",revision:"443d7d80b3cf890234d4a54e6f7c09fa"}],{}),self.__WB_DISABLE_DEV_LOGS=!0}));
