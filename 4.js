(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{70:function(t,n,r){"use strict";function e(t,n,r){return new Uint8Array(t,n,r)}function o(t,n){const r=e(t,n,4);return r[0]<<24|r[1]<<16|r[2]<<8|r[3]}function i(t,n){return String.fromCharCode(...e(t,n,4))}function a(t,n){const r=new DataView(t,n,1).getUint8(0);let e=0,i=0;return n+=4,0===r?(e=o(t,n+=8),i=o(t,n+=4)):(e=o(t,n+=16),i=o(t,(n+=4)+4)),Math.floor(i/e)}function c(t){return 255===t[0]&&216===t[1]?"image/jpg":"PNG"===String.fromCharCode(...t.slice(0,4))?"image/png":""}function u(t,n,r,a){const u={"©ART":"artist","©nam":"title","©alb":"album","©cmt":"comment","©day":"year","©too":"encoding",covr:"picture"};for(;r;){const f=o(t,n),s=u[i(t,n+4)],d=24;if(s&&f>d){const r=e(t,n+d,f-d);a[s]="picture"===s?new Blob([r],{type:c(r)}):String.fromCharCode(...r)}n+=f,r-=f}return a}r.r(n),n.default=function(t){return new Promise(n=>{const r=new FileReader;r.onloadend=function(t){const r=t.target.result;if("ftyp"!==String.fromCharCode(...e(r,4,4)))throw new Error("Not a vaild .m4a file");n(function(t){const n=t.byteLength,r=["moov","mvhd","udta","meta","ilst"];let e={},c=0;for(;r.length&&c<n;){const n=o(t,c),f=i(t,c+4);r[0]===f?(c+=8,r.shift(),"mvhd"===f?(e.duration=a(t,c),c+=n-8):"ilst"===f?e=u(t,c,n-8,e):"meta"===f&&(c+=4)):c+=n}return e}(r))},r.readAsArrayBuffer(t)})}}}]);