if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise(async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()})),r.then(()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]})},r=(r,i)=>{Promise.all(r.map(e)).then(e=>i(1===e.length?e[0]:e))},i={require:Promise.resolve(r)};self.define=(r,s,c)=>{i[r]||(i[r]=Promise.resolve().then(()=>{let i={};const a={uri:location.origin+r.slice(1)};return Promise.all(s.map(r=>{switch(r){case"exports":return i;case"module":return a;default:return e(r)}})).then(e=>{const r=c(...e);return i.default||(i.default=r),i})}))}}define("./sw.js",["./workbox-24aa846e"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"2.js",revision:"675f73d0ad1fc1b4ff7389e71a1ac2e3"},{url:"android-chrome-192x192.png",revision:"d1677e36fc6b8cdf11f715ba22e10168"},{url:"android-chrome-512x512.png",revision:"a1fc338658eb3e26291ad5c2e026346a"},{url:"apple-touch-icon.png",revision:"2de65521d3becdaefd17a71c192f866b"},{url:"assets/images/album-art-placeholder.png",revision:"9c4de475997adfd018e027d6484cb5b9"},{url:"assets/images/logo.png",revision:"c5a2d3d8ee0dcfeaa2ed00be845eba4c"},{url:"assets/images/spinner.svg",revision:"92b347bfba388b957b82c13a6ac88f59"},{url:"favicon-16x16.png",revision:"30e806374c4b073f3c197ff2fa10dfb2"},{url:"favicon-32x32.png",revision:"7114c444608a1a9583c33630f060756b"},{url:"favicon.ico",revision:"efe5895affcea184f636cb7acd02a03d"},{url:"index.html",revision:"a212d1a1108c1b3ac658ea79d5fee0de"},{url:"libs/dexie.min.js",revision:"8273d5275bf64ce154ff35acf50556a7"},{url:"main.css",revision:"bb61233ec7bed50b4cf8d7278042665f"},{url:"main.js",revision:"5464c2cb9bf0e69afe7ed5b4626ec40a"},{url:"manifest.json",revision:"257140ce14eae9b061a8cf725520d6cf"},{url:"vendor.css",revision:"3fa0b7c4272d995ea7ca9e87f9b20ab2"},{url:"vendor.js",revision:"cbd1c42a178726695022371d75941a76"},{url:"ww.js",revision:"44ffdce3c47fc2b41924d0e6a1ca4d8d"}],{}),self.__WB_DISABLE_DEV_LOGS=!0}));
