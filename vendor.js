(globalThis.webpackChunkveery=globalThis.webpackChunkveery||[]).push([[736],{202:function(){!function(){"use strict";function t(t){var e=!0,n=!1,o=null,i={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function r(t){return!!(t&&t!==document&&"HTML"!==t.nodeName&&"BODY"!==t.nodeName&&"classList"in t&&"contains"in t.classList)}function u(t){var e=t.type,n=t.tagName;return!("INPUT"!==n||!i[e]||t.readOnly)||"TEXTAREA"===n&&!t.readOnly||!!t.isContentEditable}function s(t){t.classList.contains("focus-visible")||(t.classList.add("focus-visible"),t.setAttribute("data-focus-visible-added",""))}function c(t){t.hasAttribute("data-focus-visible-added")&&(t.classList.remove("focus-visible"),t.removeAttribute("data-focus-visible-added"))}function a(n){n.metaKey||n.altKey||n.ctrlKey||(r(t.activeElement)&&s(t.activeElement),e=!0)}function d(t){e=!1}function l(t){r(t.target)&&(e||u(t.target))&&s(t.target)}function f(t){r(t.target)&&(t.target.classList.contains("focus-visible")||t.target.hasAttribute("data-focus-visible-added"))&&(n=!0,window.clearTimeout(o),o=window.setTimeout((function(){n=!1}),100),c(t.target))}function m(t){"hidden"===document.visibilityState&&(n&&(e=!0),v())}function v(){document.addEventListener("mousemove",b),document.addEventListener("mousedown",b),document.addEventListener("mouseup",b),document.addEventListener("pointermove",b),document.addEventListener("pointerdown",b),document.addEventListener("pointerup",b),document.addEventListener("touchmove",b),document.addEventListener("touchstart",b),document.addEventListener("touchend",b)}function h(){document.removeEventListener("mousemove",b),document.removeEventListener("mousedown",b),document.removeEventListener("mouseup",b),document.removeEventListener("pointermove",b),document.removeEventListener("pointerdown",b),document.removeEventListener("pointerup",b),document.removeEventListener("touchmove",b),document.removeEventListener("touchstart",b),document.removeEventListener("touchend",b)}function b(t){t.target.nodeName&&"html"===t.target.nodeName.toLowerCase()||(e=!1,h())}document.addEventListener("keydown",a,!0),document.addEventListener("mousedown",d,!0),document.addEventListener("pointerdown",d,!0),document.addEventListener("touchstart",d,!0),document.addEventListener("visibilitychange",m,!0),v(),t.addEventListener("focus",l,!0),t.addEventListener("blur",f,!0),t.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&t.host?t.host.setAttribute("data-js-focus-visible",""):t.nodeType===Node.DOCUMENT_NODE&&(document.documentElement.classList.add("js-focus-visible"),document.documentElement.setAttribute("data-js-focus-visible",""))}if("undefined"!=typeof window&&"undefined"!=typeof document){var e;window.applyFocusVisiblePolyfill=t;try{e=new CustomEvent("focus-visible-polyfill-ready")}catch(t){(e=document.createEvent("CustomEvent")).initCustomEvent("focus-visible-polyfill-ready",!1,!1,{})}window.dispatchEvent(e)}"undefined"!=typeof document&&t(document)}()},547:(t,e,n)=>{"use strict";function o(t,e,n){return new Uint8Array(t,e,n)}function i(t,e,n){return t.slice(e,e+n)}function r(t,e={}){if("little"===e.endian)return t[0]|t[1]<<8|t[2]<<16|t[3]<<24;if(7===e.shiftBase)return t[0]<<21|t[1]<<14|t[2]<<7|t[3];let n=t[1]<<16|t[2]<<8|t[3];return 4===e.byteCount&&(n=t[0]<<24|n),n}function u(t,e){return new TextDecoder(e).decode(t)}function s(t,e){return new Promise((n=>{const o=new FileReader,i=e?t.slice(0,Math.min(e,t.size)):t;o.onloadend=function({target:t}){n(t.result)},o.readAsArrayBuffer(i)}))}function c(t,e){return r(o(t,e,4),{endian:"big",shiftBase:7})}function a(t,e,n){return 3===n?r(o(t,e,4),{endian:"big"}):c(t,e)}function d(t,e,n){const i=o(t,e,n),[r]=i;if(0===r){const t=u(i,"iso-8859-1");return 0===i[i.length-1]?t.slice(1,-1):t.slice(1)}if(1===r){const t=255===i[1]&&254===i[2]?"utf-16le":"utf-16be",e=i.length%2==0?i.slice(3,-1):i.slice(3);"utf-16be"===t&&(e[0]=0);const n=u(e,t);return 0===i[i.length-1]&&0===i[i.length-2]?n.slice(0,-1):n}if(2===r){return u(i.length%2==0?i.slice(1,-1):i.slice(1),"utf-16le")}if(3===r){const t=u(i,"utf-8");return 0===i[i.length-1]?t.slice(1,-1):t.slice(1)}return u(i,"iso-8859-1")}function l(t,e){const n=u(o(t,e,4));return/\w{4}/.test(n)?n:null}function f(t,e){let n=0;for(;t[e];)e+=1,n+=1;return n}function m(t,e,n){let i=1;const r=o(t,e,n),s=f(r,i),c=u(o(t,e+i,s));i+=s+2;const a=f(r,i)+1;return i+=a,0===r[i+a+1]&&(i+=1),new Blob([r.slice(i)],{type:c})}async function v(t,e,n,i=0,r={}){const f=i,y=c(e,i+=6)+10;for(i+=4,f+y>e.byteLength&&(e=await s(t,f+y+e.byteLength));;){const s=l(e,i),c=a(e,i+=4,n);i+=4;const[h]=o(e,i+1,2),b=(h>>1)%2!=0;if(i+=2,!s){if("ID3"===u(o(e,i=f+y,3)))return v(t,e,n,i,r);break}{const t=p(s);let o=i,u=c;b&&(u=a(e,o,n),o+=4),t&&!r[t]&&(r[t]="picture"===t?m(e,o,u):d(e,o,u))}i+=c}for(;0===new DataView(e,i,1).getUint8(0);)i+=1;let E=0,L=!0;for(;i<e.byteLength;){const n=o(e,i,4);if(255!==n[0]||n[1]<112)return r.duration=w(E,r),r;if(L){r=b(n,r);const c=36,a=u(o(e,i+c,4));if("Xing"===a||"Info"===a)return g(e,i+c,r);e=await s(t),L=!1}E+=1,i+=h(n[2],r)}return r.duration=w(E,r),r}function h(t,{bitrate:e,sampleRate:n}){const o=(2&t)>0?1:0;return Math.floor(144e3*e/n)+o}function b(t,e){const n=[0,32,48,56,64,80,96,112,128,144,160,176,192,224,256,0],o=[0,8,16,24,32,40,48,56,64,80,96,112,128,144,160,0],i=[[null,o,o,n],null,[null,o,o,n],[null,[0,32,40,48,56,64,80,96,112,128,160,192,224,256,320,0],[0,32,48,56,64,80,96,112,128,160,192,224,256,320,384,0],[0,32,64,96,128,160,192,224,256,288,320,352,384,416,448,0]]],r=t[1]>>3&3,u=t[1]>>1&3,s=t[2]>>2&3,c=t[2]>>4&15;return e.sampleRate=[[11025,12e3,8e3],null,[22050,24e3,16e3],[44100,48e3,32e3]][r][s],e.samplesPerFrame=[[384,1152,576],null,[384,1152,576],[384,1152,1152]][r][u],e.bitrate=i[r][u][c],e}function w(t,{samplesPerFrame:e,sampleRate:n}){return Math.floor(t*e/n)}function g(t,e,n){const i=r(o(t,e+8,4),{endian:"big"});return n.duration=w(i,n),n}function p(t){return{TIT2:"title",TPE1:"artist",TALB:"album",APIC:"picture"}[t]}function y(t){const e=atob(t),n=new Uint8Array(e.length);for(let t=0;t<e.length;t++)n[t]=e.charCodeAt(t);return n}function E(t,e){return r(i(t,e,4),{endian:"big"})}function L(t,e){let n=4;const o=E(t,n);n+=4;const r=u(i(t,n,o));n+=o;const s=E(t,n);n+=4,n+=s,n+=16;const c=E(t,n);return n+=4,e.picture=new Blob([i(t,n,c)],{type:r}),e}function A(t,e){return r(i(t,e,4),{endian:"little"})}function T(t,e,n=0){const o=A(t,n);let r=A(t,n+=o+4);for(n+=4;r;){const o=A(t,n),s=u(i(t,n+=4,o),"utf-8"),[c,a]=s.split("=");"METADATA_BLOCK_PICTURE"===c?e=L(y(a),e):e[c.toLowerCase()]=a,n+=o,r-=1}return e}function C(t,e){const n=N(t.slice(10,13))>>4,o=N([15&t[13],...t.slice(14,18)]);return n&&(e.duration=Math.floor(o/n)),e}function N(t){return t.reduce(((t,e)=>(t<<8)+e),0)}async function U(t,e,n=4){let i={},u=!1;for(;!u;){const c=o(e,n,4),a=r(c,{endian:"big"}),d=c[0],l=127&d;if(u=128==(128&d),(n+=4)+a>e.byteLength&&(e=await s(t,e.byteLength+n+a)),0===l){i=C(o(e,n,a),i)}else if(4===l){i=T(o(e,n,a),i)}else if(6===l){i=L(o(e,n,a),i)}n+=a}return i}function D(t,e){const n=new Uint8Array(t.length+e.length);return n.set(t),n.set(e,t.length),n}function M(t,e){const n=u(i(t,0,5));if("OpusH"===n||"vorb"===n)return function(t,e){return e.sampleRate=r(i(t,12,4),{endian:"little"}),e}(t,e);if("OpusT"===n)return T(t,e,8);if("vorb"===n)return T(t,e,7);throw new Error("Unknown type")}function O(t,e){return r(o(t,e,4),{endian:"big",byteCount:4})}function R(t,e){const n=new DataView(t,e,1).getUint8(0);let o=0,i=0;return e+=4,0===n?(o=O(t,e+=8),i=O(t,e+=4)):(o=O(t,e+=16),i=O(t,(e+=4)+4)),Math.floor(i/o)}function B(t,e,n,i){const r={"©ART":"artist","©nam":"title","©alb":"album","©cmt":"comment","©day":"year","©too":"encoding",covr:"picture"};for(;n;){const c=O(t,e),a=r[u(o(t,e+4,4),"iso-8859-1")],d=24;if(a&&c>d){const n=o(t,e+d,c-d);i[a]="picture"===a?new Blob([n],{type:(s=n,255===s[0]&&216===s[1]?"image/jpg":"PNG"===u(s.slice(0,4))?"image/png":"")}):u(n,"utf-8")}e+=c,n-=c}var s;return i}async function P(t,e){const n=o(e,0,8),i=u(n);if(i.startsWith("ID3")){if(n[3]<3)throw new Error("Unsupported ID3 tag version");const i=function(t){const e=o(t,6,4);return 2097152*e[0]+16384*e[1]+128*e[2]+e[3]}(e)+10;return"fLaC"===u(o(e=await s(t,e.byteLength+i+1024),i,4))?U(t,e,i+4):v(t,e,n[3])}if(i.startsWith("fLaC"))return U(t,e);if(i.startsWith("OggS"))return function(t){let e={},n=0,i=2,u=new Uint8Array;for(;n<t.byteLength;){n+=5;const[s]=o(t,n,1);if(n+=1,4===s){const i=r(o(t,n,4),{endian:"little"});return e.duration=Math.floor(i/e.sampleRate),e}n+=20;const[c]=o(t,n,1);n+=1;const a=o(t,n,c);let d=0;n+=c;for(let t=0;t<c;t++)d+=a[t];if(i){const r=a[a.length-1];u=D(u,o(t,n,d)),d%255==0&&r||(i-=1,e=M(u,e),u=new Uint8Array)}n+=d}}(e=await s(t));if(i.endsWith("ftyp"))return function(t){const e=["moov","mvhd","udta","meta","ilst"];let n={},i=0;for(;e.length&&i<t.byteLength;){const r=O(t,i),s=u(o(t,i+4,4));e[0]===s?(i+=8,e.shift(),"mvhd"===s?(n.duration=R(t,i),i+=r-8):"ilst"===s?n=B(t,i,r-8,n):"meta"===s&&(i+=4)):i+=r}return n}(e=await s(t));throw new Error("Invalid or unsupported file")}function I(t){return new Promise((e=>{const n=new FileReader,o=Math.min(24576,t.size);n.onloadend=function({target:n}){e(P(t,n.result))},n.readAsArrayBuffer(t.slice(0,o))}))}n.d(e,{Z:()=>I})}}]);