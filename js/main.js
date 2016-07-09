!function e(t,n,r){function a(o,s){if(!n[o]){if(!t[o]){var l="function"==typeof require&&require;if(!s&&l)return l(o,!0);if(i)return i(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var c=n[o]={exports:{}};t[o][0].call(c.exports,function(e){var n=t[o][1][e];return a(n?n:e)},c,c.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)a(r[o]);return a}({1:[function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(){var e=new Worker("js/workers/worker1.js");return e.onmessage=function(e){var t,r=e.data;if("init"===r.action)return void(n.worker=T=i());var s=o();(t=s.tracks).push.apply(t,a(r.tracks)),h.init(s,"list",!1)},e.onerror=function(e){console.log(e)},e}function o(){var e=g.get("local-files");return e?e:g.create({id:"local-files",title:"Local files"})}function s(e){return new Promise(function(t){var n=URL.createObjectURL(e),r=new Audio(n);r.preload="metadata",r.addEventListener("loadedmetadata",function a(){var e=y.formatTime(r.duration);r.removeEventListener("loadedmetadata",a),r=null,n=URL.revokeObjectURL(n),t(e)})})}function l(e){return e.slice(0,e.lastIndexOf("."))}function u(e){var t=new Audio;return e.filter(function(e){return t.canPlayType(e.type)})}function c(e,t){return e.reduce(function(e,n){var r=l(n.name.trim()),a=t.some(function(e){return e.name===r});return a||e.push({audioTrack:n,name:r}),e},[])}function d(e){return new Promise(function(t){parse_audio_metadata(e,function(e){t(e)})})}function f(e,t,n){return Promise.all([d(e[0].audioTrack),s(e[0].audioTrack)]).then(function(r){return t.push({index:n+t.length,title:r[0].title.trim(),artist:r[0].artist?r[0].artist.trim():"",album:r[0].album?r[0].album.trim():"",name:e[0].name,thumbnail:r[0].picture,audioTrack:e[0].audioTrack,duration:r[1]}),e.splice(0,1),w.setAttrValue("value",t.length),e.length?f(e,t,n):t})}function p(e,t){w.setAttrValue("max",t.length),w.toggle(),f(t,[],e.tracks.length).then(function(t){var n;w.toggle(),(n=e.tracks).push.apply(n,a(t)),document.getElementById("js-"+e.id)?h.appendTo(e,t,"list",!0):h.init(e,"list",!0),T.postMessage({action:"update",playlist:e.tracks})})["catch"](function(e){console.log(e)})}function v(e){var t=u(e);if(!t.length)return void k.showNotice("No valid audio files found");var n=o(),r=c(t,n.tracks);return r.length?void p(n,r):void k.showNotice("Tracks already exist")}Object.defineProperty(n,"__esModule",{value:!0}),n.worker=n.addTracks=void 0;var y=e("./main.js"),m=e("./playlist/playlist.js"),g=r(m),j=e("./playlist/playlist.manage.js"),h=r(j),b=e("./playlist/playlist.add.js"),k=r(b),T=i(),w=function(){function e(e,t){n.setAttribute(e,t)}function t(){n.classList.toggle("show"),document.getElementById("js-local-notice").classList.toggle("show")}var n=document.getElementById("js-file-progress");return{toggle:t,setAttrValue:e}}();n.addTracks=v,n.worker=T},{"./main.js":2,"./playlist/playlist.add.js":8,"./playlist/playlist.js":9,"./playlist/playlist.manage.js":10}],2:[function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(e,t){var n=document.querySelector("."+e+"."+t);n&&n.classList.remove(t)}function i(e,t){a("js-tab-select-btn","active"),a("tab","active"),u.set("activeTab",e),document.getElementById("js-tab-"+e).classList.add("active"),t||document.querySelector("[data-tab-item="+e+"]").classList.add("active")}function o(e,t){for(;e;){var n=e.getAttribute(t);if(n)return{element:e,attrValue:n};e=e.parentElement}}function s(e){var t="";if(e=Math.floor(e),e>=60){var n=Math.floor(e/60);t=n+":"}else t="0:";var r=e%60;return t+=10>r?"0"+r:r}Object.defineProperty(n,"__esModule",{value:!0}),n.formatTime=n.removeClassFromElement=n.getElementByAttr=n.toggleTab=n.scriptLoader=void 0;var l=e("./settings.js"),u=r(l),c=function(){function e(e,n){if(!t.includes(e)){var r=document.createElement("script");r.setAttribute("src",e),document.getElementsByTagName("body")[0].appendChild(r),t.push(e),n&&(r.onload=function(){n()})}}var t=[];return{load:e}}();n.scriptLoader=c,n.toggleTab=i,n.getElementByAttr=o,n.removeClassFromElement=a,n.formatTime=s},{"./settings.js":13}],3:[function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(e){var t=document.getElementById("js-player-play"),n="",r="";"icon-play"===e?(n="icon-pause",r="Play"):"icon-pause"===e&&(n="icon-play",r="Pause"),t.classList.remove(n),t.classList.add(e),t.setAttribute("title",r)}function i(e){var t=e?"icon-play":"icon-pause";a(t)}function o(e,t){var n=document.getElementById("js-player-"+e+"-slider"),r=n.getBoundingClientRect(),a=r.left,i=r.width,o=(t-a)/i;return 0>o?o=0:o>1&&(o=1),100*o}function s(){w.stop(),d(0),c("track",0)}function l(e){var t=o("volume",e.screenX);c("volume",t),T.setVolume(t/100)}function u(){document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",u)}function c(e,t){document.getElementById("js-player-"+e+"-elapsed").style.width=t+"%"}function d(e){document.getElementById("js-player-elapsed").textContent=j.formatTime(e)}function f(e){var t=arguments.length<=1||void 0===arguments[1]?!0:arguments[1],n=document.getElementById("js-player-duration");n.textContent=t?j.formatTime(e):e}function p(e){c("track",o("track",e.screenX))}function v(e){var t=e.screenX;b.getCurrentTrack()&&T.seek(o("track",t)),m.set("seeking",!1),document.removeEventListener("mousemove",p),document.removeEventListener("mouseup",v)}Object.defineProperty(n,"__esModule",{value:!0}),n.resetTrackSlider=n.showTrackDuration=n.setElapsedTime=n.addClassOnPlayBtn=n.togglePlayBtnClass=n.elapsedTime=void 0;var y=e("./../settings.js"),m=r(y),g=e("./../main.js"),j=r(g),h=e("./../playlist/playlist.js"),b=r(h),k=e("./player.js"),T=r(k),w=function(){function e(){r&&clearTimeout(r)}function t(e){var t=e.currentTime,n=e.duration,a=performance.now();return new Promise(function(e){!function i(t,a,o){var s=t/n*100,l=performance.now()-a,u=l-o;d(t),m.get("seeking")||c("track",s),r=setTimeout(function(){n>t?(t+=1,o+=1e3,i(t,a,o)):e()},1e3-u)}(Math.floor(t),a,0)})}function n(n,r){return e(),t(n,r)}var r=0;return{stop:e,start:n}}();document.getElementById("js-player-track").addEventListener("mousedown",function(e){1===e.which&&e.target.getAttribute("data-track-item")&&b.getCurrentTrack()&&(m.set("seeking",!0),c("track",o("track",e.screenX)),document.addEventListener("mousemove",p),document.addEventListener("mouseup",v))}),document.getElementById("js-volume-track").addEventListener("mousedown",function(e){1===e.which&&e.target.getAttribute("data-volume-item")&&(l(e),document.addEventListener("mousemove",l),document.addEventListener("mouseup",u))}),document.getElementById("js-player-controls").addEventListener("click",function(e){var t=e.target,n=t.getAttribute("data-control-item");switch(n){case"previous":T.playNext(-1);break;case"play":T.play();break;case"stop":T.stop();break;case"next":T.playNext(1);break;case"repeat":case"shuffle":t.classList.toggle("active"),T[n](t.classList.contains("active"));break;case"volume":document.getElementById("js-volume-track").classList.toggle("active"),t.classList.toggle("active")}}),window.addEventListener("DOMContentLoaded",function E(){var e=m.get("repeat"),t=m.get("shuffle"),n=m.get("volume");e&&document.querySelector('[data-control-item="repeat"]').classList.add("active"),t&&document.querySelector('[data-control-item="shuffle"]').classList.add("active"),c("volume",100*n),window.removeEventListener("DOMContentLoaded",E)}),n.elapsedTime=w,n.togglePlayBtnClass=i,n.addClassOnPlayBtn=a,n.setElapsedTime=d,n.showTrackDuration=f,n.resetTrackSlider=s},{"./../main.js":2,"./../playlist/playlist.js":9,"./../settings.js":13,"./player.js":4}],4:[function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(e,t){var n=O.getActivePlaylistId();return P.showTrackDuration(e.duration,!1),P.addClassOnPlayBtn("icon-pause"),L.showTrackInfo(e),L.showActiveIcon(n),A.showPlayingTrack(e.index,n,w.get("manual")),w.set("paused",!1),w.set("manual",!1),P.elapsedTime.start(t)}function i(e){return w.get("repeat")?(P.resetTrackSlider(),void e()):void f(1)}function o(e){return"local-files"===e?"native":e.includes("yt-pl-")?"youtube":e.includes("sc-pl-")?"soundcloud":void 0}function s(e,t){var n=w.get("paused");n?e():(t(),P.elapsedTime.stop(),P.addClassOnPlayBtn("icon-play")),w.set("paused",!n)}function l(e,t){"native"===t?B.playTrack(e):"youtube"===t?M.playTrack(e):"soundcloud"===t&&V.playTrack(e)}function u(e){var t=O.getSelectedTrack(),n=0;t?(n=t.index,w.set("manual",!0)):n=O.getNextTrackIndex(0),p(n,e)}function c(e){var t=O.getTrackAtCurrentIndex();t&&(O.setCurrentTrack(t),"native"===e?B.play(t):"youtube"===e?M.togglePlaying():"soundcloud"===e&&V.togglePlaying())}function d(){var e=w.get("player");if(!e){var t=w.get("activeTab");return void(O.get(t)&&(O.setActive(t),u(t)))}c(e)}function f(e){var t=w.get("player"),n=O.getCurrentTrack();if(t&&n){v(n,t);var r=O.getNextTrack(e);r&&l(r,t)}}function p(e,t){var n=O.getCurrentTrack(),r=o(t),a=O.get(t),i=a.tracks[e];(!w.get("paused")||n)&&v(n),i&&(w.set("player",r),w.get("shuffle")&&!a.shuffled?(O.shufflePlaybackOrder(!0,a),O.resetCurrentIndex()):O.setCurrentIndex(i.index),O.setCurrentTrack(i),l(i,r))}function v(){var e=arguments.length<=0||void 0===arguments[0]?O.getCurrentTrack():arguments[0],t=arguments.length<=1||void 0===arguments[1]?w.get("player"):arguments[1];e&&("native"===t?B.stop(e):"youtube"===t?M.stop():"soundcloud"===t&&V.stop(),t&&(L.hideActiveIcon(),k.removeClassFromElement("track","playing"),y()))}function y(){w.set("paused",!0),O.setCurrentTrack(null),P.resetTrackSlider(),P.showTrackDuration(0),P.addClassOnPlayBtn("icon-play"),L.showTrackInfo()}function m(e){w.set("repeat",e)}function g(e){var t=O.getActive()||O.get(w.get("activeTab"));w.set("shuffle",e),t&&(O.shufflePlaybackOrder(e,t),O.resetCurrentIndex())}function j(e){var t=w.get("player");w.set("volume",e),"native"===t?B.setVolume(e):"youtube"===t?M.setVolume(e):"soundcloud"===t&&V.setVolume(e)}function h(e){var t=w.get("player"),n=0;"native"===t?n=B.getElapsed(e):"youtube"===t?n=M.getElapsed(e):"soundcloud"===t&&(n=V.getElapsed(e)),P.setElapsedTime(n)}Object.defineProperty(n,"__esModule",{value:!0}),n.onTrackEnd=n.onTrackStart=n.setVolume=n.toggleTrackPlaying=n.seek=n.shuffle=n.repeat=n.stop=n.playNext=n.play=void 0;var b=e("./../main.js"),k=r(b),T=e("./../settings.js"),w=r(T),E=e("./../sidebar.js"),L=r(E),I=e("./../playlist/playlist.js"),O=r(I),x=e("./../playlist/playlist.view.js"),A=r(x),C=e("./player.controls.js"),P=r(C),_=e("./player.native.js"),B=r(_),S=e("./player.youtube.js"),M=r(S),N=e("./player.soundcloud.js"),V=r(N);document.getElementById("js-tab-container").addEventListener("dblclick",function(e){var t=e.target,n=k.getElementByAttr(t,"data-index");if(n){var r=n.attrValue,a=w.get("activeTab");w.set("manual",!0),O.setActive(a),p(r,a)}}),n.play=d,n.playNext=f,n.stop=v,n.repeat=m,n.shuffle=g,n.seek=h,n.toggleTrackPlaying=s,n.setVolume=j,n.onTrackStart=a,n.onTrackEnd=i},{"./../main.js":2,"./../playlist/playlist.js":9,"./../playlist/playlist.view.js":11,"./../settings.js":13,"./../sidebar.js":14,"./player.controls.js":3,"./player.native.js":5,"./player.soundcloud.js":6,"./player.youtube.js":7}],5:[function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(e){return{currentTime:e.currentTime,duration:Math.floor(e.duration)}}function i(e){console.log(e),e.audioBlobURL=URL.createObjectURL(e.audioTrack),e.audio=new Audio(e.audioBlobURL),e.audio.oncanplay=function(){e.audio.volume=d.get("volume"),e.audio.play()},e.audio.onplaying=function(){y.onTrackStart(e,a(e.audio)).then(function(){var t=e.audio.play.bind(e.audio);y.onTrackEnd(t)})}}function o(e){var t=e.audio;if(t){var n=t.play.bind(t),r=t.pause.bind(t);return void y.toggleTrackPlaying(n,r)}i(e)}function s(e){URL.revokeObjectURL(e.audioBlobURL),e.audio.load(),e.audio.oncanplay=null,e.audio.onplaying=null,e.audio.onended=null,delete e.audioBlobURL,delete e.audio}function l(e){var t=p.getCurrentTrack();t&&(t.audio.volume=e)}function u(e){var t=p.getCurrentTrack(),n=t.audio;if(n){var r=n.duration/100*e;return n.currentTime=r,r}return 0}Object.defineProperty(n,"__esModule",{value:!0}),n.setVolume=n.getElapsed=n.playTrack=n.stop=n.play=void 0;var c=e("./../settings.js"),d=r(c),f=e("./../playlist/playlist.js"),p=r(f),v=e("./player.js"),y=r(v);n.play=o,n.stop=s,n.playTrack=i,n.getElapsed=u,n.setVolume=l},{"./../playlist/playlist.js":9,"./../settings.js":13,"./player.js":4}],6:[function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(e){return{currentTime:e.currentTime()/1e3,duration:Math.floor(e.streamInfo.duration/1e3)}}function i(){y.seek(0),y.play()}function o(e){y&&y.seek(0),console.log(e),SC.stream("/tracks/"+e.id).then(function(t){y=t,t.setVolume(f.get("volume")),t.play(),t.on("play-resume",function(){v.onTrackStart(e,a(y)).then(function(){v.onTrackEnd(i)})})})["catch"](function(e){console.log(e)})}function s(){var e=y.play.bind(y),t=y.pause.bind(y);v.toggleTrackPlaying(e,t)}function l(){y.seek(0),y.pause()}function u(e){y.setVolume(e)}function c(e){if(y){var t=y.streamInfo.duration/1e3,n=t/100*e;return y.seek(1e3*n),n}return 0}Object.defineProperty(n,"__esModule",{value:!0}),n.setVolume=n.getElapsed=n.togglePlaying=n.playTrack=n.stop=void 0;var d=e("./../settings.js"),f=r(d),p=e("./player.js"),v=r(p),y=null;n.stop=l,n.playTrack=o,n.togglePlaying=s,n.getElapsed=c,n.setVolume=u},{"./../settings.js":13,"./player.js":4}],7:[function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(e){return{currentTime:e.getCurrentTime(),duration:e.getDuration()}}function i(e){var t=e.data;if(t===YT.PlayerState.PLAYING){var n=g.getCurrentTrack()||g.getNextTrack(0);console.log(n),h.onTrackStart(n,a(b)).then(function(){var e=b.playVideo.bind(b);h.onTrackEnd(e)})}}function o(){var e=g.getNextTrack(0);c(e)}function s(e){console.log(e)}function l(){b=new YT.Player("yt-player",{height:"390",width:"640",videoId:"",events:{onReady:o,onStateChange:i,onError:s}})}function u(){var e=b.playVideo.bind(b),t=b.pauseVideo.bind(b);h.toggleTrackPlaying(e,t)}function c(e){return b?(f(y.get("volume")),void b.loadVideoById(e.id)):void l()}function d(){b.stopVideo()}function f(e){b.setVolume(100*e)}function p(e){var t=b.getDuration(),n=t/100*e;return b.seekTo(n,!0),n}Object.defineProperty(n,"__esModule",{value:!0}),n.setVolume=n.getElapsed=n.togglePlaying=n.playTrack=n.stop=void 0;var v=e("./../settings.js"),y=r(v),m=e("./../playlist/playlist.js"),g=r(m),j=e("./player.js"),h=r(j),b=null;n.stop=d,n.playTrack=c,n.togglePlaying=u,n.getElapsed=p,n.setVolume=f},{"./../playlist/playlist.js":9,"./../settings.js":13,"./player.js":4}],8:[function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(e){var t=document.getElementById("js-playlist-add-notice");t.textContent=e,t.classList.add("show"),setTimeout(function(){t.textContent="",t.classList.remove("show")},4e3)}function o(e,t){"youtube"===e?j.fetchPlaylist(t):"soundcloud"===e&&b.fetchPlaylist(t)}function s(e){var t=T.get(e.id);t&&E.remove(t.id),E.init(T.create(e),"grid",!0)}function l(e){var t=e.attrValue;t!==L&&(L=t,f.removeClassFromElement("playlist-provider","selected"),e.element.classList.add("selected"),document.getElementById("js-import-form-container").classList.add("show")),f.scriptLoader.load("js/libs/sdk.js",b.init)}function u(e){var t=document.getElementById("js-file-chooser"),n=new MouseEvent("click");"file"===e?(t.removeAttribute("webkitdirectory"),t.removeAttribute("directory"),t.setAttribute("multiple",!0)):"folder"===e&&(t.removeAttribute("multiple"),t.setAttribute("webkitdirectory",!0),t.setAttribute("directory",!0)),t.dispatchEvent(n),f.scriptLoader.load("js/libs/metadata-audio-parser.js")}function c(e,t,n,r){if(t.setAttribute("title",e[0].toUpperCase()+e.slice(1)),t.setAttribute("data-action",e),t.classList.toggle("active"),"save"===e)n.removeAttribute("readonly"),n.focus(),n.selectionStart=0,n.selectionEnd=n.value.length;else if("edit"===e){var a=T.get(r);n.value||(n.value=a.title);var i=n.value;i!==a.title&&(a.title=i,v.editEntry(r,i),n.setAttribute("value",i),T.save(a)),n.setAttribute("readonly","readonly")}}Object.defineProperty(n,"__esModule",{value:!0}),n.showNotice=n.add=void 0;var d=e("./../main.js"),f=r(d),p=e("./../sidebar.js"),v=r(p),y=e("./../local.js"),m=r(y),g=e("./../youtube.js"),j=r(g),h=e("./../soundcloud.js"),b=r(h),k=e("./playlist.js"),T=r(k),w=e("./playlist.manage.js"),E=r(w),L="";document.getElementById("js-file-chooser").addEventListener("change",function(e){var t=e.target;m.addTracks([].concat(a(t.files))),t.value=""}),document.getElementById("js-playlist-import-form").addEventListener("submit",function(e){var t=e.target,n=t.elements["playlist-id"].value.trim();n&&(o(L,n),t.reset()),e.preventDefault()}),document.getElementById("js-playlist-entries").addEventListener("click",function(e){var t=e.target,n=t.getAttribute("data-action"),r=f.getElementByAttr(t,"data-id");if(r){if("remove"===n)return void E.remove(r.attrValue,r.element);var a="";if("save"===n?a="edit":"edit"===n&&(a="save"),a){var i=r.element.querySelector(".playlist-entry-title");c(a,t,i,r.attrValue)}}}),document.getElementById("js-playlist-add-options").addEventListener("click",function(e){var t=e.target,n=f.getElementByAttr(t,"data-choice");if(n){var r=n.attrValue;return"file"===r||"folder"===r?void u(r):void l(n)}}),window.addEventListener("DOMContentLoaded",function I(){Object.keys(localStorage).forEach(function(e){if(e.startsWith("yt-pl-")||e.startsWith("sc-pl-")){var t=JSON.parse(localStorage.getItem(e));f.scriptLoader.load("https://www.youtube.com/iframe_api"),f.scriptLoader.load("js/libs/sdk.js",b.init),E.init(T.create(t),"grid",!1)}}),window.removeEventListener("DOMContentLoaded",I)}),n.add=s,n.showNotice=i},{"./../local.js":1,"./../main.js":2,"./../sidebar.js":14,"./../soundcloud.js":15,"./../youtube.js":16,"./playlist.js":9,"./playlist.manage.js":10}],9:[function(e,t,n){"use strict";function r(){return A}function a(e){return A[e]}function i(e){var t={id:e.id,order:-e.order,shuffled:e.shuffled,sortedBy:e.sortedBy,playbackOrder:e.playbackOrder,title:e.title};(e.id.startsWith("yt-pl-")||e.id.startsWith("sc-pl-"))&&(t.tracks=e.tracks),localStorage.setItem(e.id,JSON.stringify(t))}function o(e){return A[e.id]=Object.assign({sortedBy:"",order:0,shuffled:!1,tracks:e.tracks||[],playbackOrder:[]},e,JSON.parse(localStorage.getItem(e.id))||{}),A[e.id]}function s(e){delete A[e],localStorage.removeItem(e)}function l(e){A.hasOwnProperty(e)&&(C=e)}function u(){return C}function c(e){return e===C}function d(){return A[C]}function f(e){P=e}function p(){return P}function v(e){var t=d();_=t.playbackOrder.indexOf(Number.parseInt(e,10))}function y(){var e=p();e&&v(e.index)}function m(){var e=d();return e.playbackOrder[_]}function g(){var e=m();return L(e)}function j(e){B=Object.assign({},e)}function h(){return B}function b(e,t){e.playbackOrder=e.tracks.map(function(e){return e.index}),t?(T(!0,e),y()):i(e)}function k(e){for(var t=e.length;t;){var n=Math.floor(Math.random()*t);t-=1;var r=[e[n],e[t]];e[t]=r[0],e[n]=r[1]}return e}function T(e,t){t.shuffled=e,e?t.playbackOrder=k(t.playbackOrder):t.playbackOrder.sort(function(e,t){return e-t}),i(t)}function w(){_-=1}function E(e){var t=d(),n=t.playbackOrder;return _+=e,_===n.length&&(_=0),-1===_&&(_=n.length-1),n[_]}function L(e){var t=d();return t.tracks[e]}function I(e){var t=E(e),n=L(t);return n?(f(n),v(n.index),n):void 0}function O(e,t,n){e.sort(function(e,r){var a=e[t].toLowerCase(),i=r[t].toLowerCase();return i>a?-1*n:a>i?1*n:0})}function x(e,t){e.order=e.sortedBy===t&&1===e.order?-1:1,e.sortedBy=t,O(e.tracks,t,e.order),i(e)}Object.defineProperty(n,"__esModule",{value:!0});var A={},C="",P=null,_=0,B=null;n.get=a,n.create=o,n.remove=s,n.save=i,n.sort=x,n.getAll=r,n.getActive=d,n.setActive=l,n.isActive=c,n.getActivePlaylistId=u,n.setCurrentTrack=f,n.getCurrentTrack=p,n.getNextTrackIndex=E,n.getNextTrack=I,n.setCurrentIndex=v,n.resetCurrentIndex=y,n.getTrackAtCurrentIndex=g,n.getTrackAtIndex=L,n.setSelectedTrack=j,n.getSelectedTrack=h,n.setTrackIndexes=b,n.shufflePlaybackOrder=T,n.decrementIndex=w},{}],10:[function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(e,t,n){var r="playlist/"+e.id;e.playbackOrder.length||I.setTrackIndexes(e,j.get("shuffle")),v.add(r),x.add(e,t),b.createEntry(e.title,e.id),u(e.title,e.id),e.sortedBy&&(I.sort(e,e.sortedBy),s(e)),n&&v.isActive("add")?v.toggle(r):v.isActive(e.id)&&m.toggleTab(e.id)}function i(e,t,n,r){if(I.setTrackIndexes(e,j.get("shuffle")),x.append(e.id,t,n),r){var a="playlist/"+e.id;v.toggle(a)}}function o(e,t){x.remove(e),"local-files"===e&&T.worker.postMessage({action:"clear"}),I.isActive(e)&&E.stop(),t||(t=document.querySelector("[data-id="+e+"]")),t.parentElement.removeChild(t),I.remove(e),b.removeEntry(e)}function s(e){var t=I.getCurrentTrack();m.removeClassFromElement("track","selected"),x.update(e),t&&I.isActive(e.id)&&(x.showPlayingTrack(t.index,e.id,!1),I.setCurrentIndex(t.index))}function l(e,t,n){e.forEach(function(e){var r=t[e.index],a=e.title?e.title.toLowerCase():"",i=e.artist?e.artist.toLowerCase():"",o=e.album?e.album.toLowerCase():"";a.includes(n)||i.includes(n)||o.includes(n)?r.classList.remove("hidden"):r.classList.add("hidden")})}function u(e,t){var n=document.getElementById("js-playlist-entries"),r='\n        <li class="playlist-entry" data-id='+t+'>\n            <input type="text" class="input playlist-entry-title" value="'+e+'" readonly>\n            <span>\n                <button class="icon-pencil font-btn playlist-entry-btn"\n                    data-action="edit" title="Edit playlist title"></button>\n                <button class="icon-trash font-btn playlist-entry-btn"\n                    data-action="remove" title="Remove playlist"></button>\n            </span>\n        </li>\n    ';n.insertAdjacentHTML("beforeend",r)}function c(e){var t=I.get(j.get("activeTab")),n=document.getElementById("js-"+t.id+"-filter-input").value.trim();if(I.sort(t,e),s(t),n){var r=document.getElementById("js-"+t.id).children;n=n.toLowerCase(),l(t.tracks,r,n)}}function d(e){m.removeClassFromElement("track","selected"),e.classList.add("selected")}function f(e,t,n){var r=Number.parseInt(n.getAttribute("data-index"),10),a=I.getCurrentTrack(),i=a?a.index:-1,o=j.get("shuffle");if("local-files"===e.id){var s=e.tracks[r].name;T.worker.postMessage({action:"remove",name:s})}else(e.id.startsWith("yt-pl-")||e.id.startsWith("sc-pl-"))&&(e.deleted=e.deleted||[],e.deleted.push(e.tracks[r].id));t.removeChild(n),e.tracks.splice(r,1),e.tracks.forEach(function(e,n){e.index=n,t.children[n].setAttribute("data-index",n)}),I.setTrackIndexes(e,o,!0),a&&i===r?j.get("paused")?E.stop():E.playNext(0):i>r&&!o&&I.decrementIndex()}Object.defineProperty(n,"__esModule",{value:!0}),n.remove=n.appendTo=n.init=void 0;var p=e("./../router.js"),v=r(p),y=e("./../main.js"),m=r(y),g=e("./../settings.js"),j=r(g),h=e("./../sidebar.js"),b=r(h),k=e("./../local.js"),T=r(k),w=e("./../player/player.js"),E=r(w),L=e("./playlist.js"),I=r(L),O=e("./playlist.view.js"),x=r(O),A=0;document.getElementById("js-tab-container").addEventListener("click",function(e){var t=e.target,n=t.getAttribute("data-sort");if(n)return void c(n);var r=m.getElementByAttr(t,"data-index");r&&(I.setSelectedTrack({playlistId:j.get("activeTab"),index:Number.parseInt(r.attrValue,10)}),d(r.element))}),window.addEventListener("keyup",function(e){var t=e.target;A&&clearTimeout(A),A=setTimeout(function(){if(t.classList.contains("filter-input")){var e=I.get(j.get("activeTab")),n=document.getElementById("js-"+e.id).children,r=t.value.trim().toLowerCase();l(e.tracks,n,r)}},400)}),window.addEventListener("keypress",function(e){var t="Delete"===e.key||127===e.keyCode,n=I.get(j.get("activeTab"));if(t&&n){var r=document.getElementById("js-"+n.id),a=r.querySelector(".track.selected");a&&f(n,r,a)}}),n.init=a,n.appendTo=i,n.remove=o},{"./../local.js":1,"./../main.js":2,"./../player/player.js":4,"./../router.js":12,"./../settings.js":13,"./../sidebar.js":14,"./playlist.js":9,"./playlist.view.js":11}],11:[function(e,t,n){"use strict";function r(e){return'\n        <li class="list-item track" data-index="'+e.index+'">\n            <span>'+e.title+"</span>\n            <span>"+e.artist+"</span>\n            <span>"+e.album+"</span>\n            <span>"+e.duration+"</span>\n        </li>\n    "}function a(e,t){return'\n        <ul class="list list-view-header">\n            <li class="list-view-header-item">\n                <span data-sort="title">TITLE</span>\n            </li>\n            <li class="list-view-header-item">\n                <span data-sort="artist">ARTIST</span>\n            </li>\n            <li class="list-view-header-item">\n                <span data-sort="album">ALBUM</span>\n            </li>\n            <li class="list-view-header-item">\n                <span data-sort="duration">LENGTH</span>\n            </li>\n        </ul>\n        <ul id="js-'+e+'" class="list list-view">'+t+"</ul>\n    "}function i(e){var t=e.title;return t.length>64&&(t=t.slice(0,64)+"..."),'\n        <li class="grid-item track" data-index="'+e.index+'">\n            <div class="grid-item-thumb-container">\n                <div class="grid-item-duration">'+e.duration+'</div>\n                <img src="'+e.thumbnail+'" class="grid-item-thumb">\n            </div>\n            <div title="'+e.title+'">'+t+"</div>\n        </li>\n    "}function o(e,t){return'\n        <div class="grid-view-sort-select">\n            <button class="font-btn" data-sort="title">Title</button>\n            <button class="font-btn" data-sort="duration">Duration</button>\n        </div>\n        <ul id="js-'+e+'" class="list grid-view">'+t+"</ul>\n    "}function s(e,t){return t.map(function(t){return e(t)}).join("")}function l(e,t){var n=e.id,l=e.tracks,u="";return"list"===t?u=a(n,s(r,l)):"grid"===t&&(u=o(n,s(i,l))),'\n        <div id="js-tab-'+n+'" class="tab">\n            <div class="playlist-header">\n                <input type="text" class="input filter-input"\n                    id="js-'+n+'-filter-input"\n                    placeholder="Filter">\n            </div>\n            <div class="playlist-container">'+u+"</div>\n        </div>\n    "}function u(e,t){var n=l(e,t),r=document.getElementById("js-tab-container");r.insertAdjacentHTML("beforeend",n)}function c(e,t,n){var a=document.getElementById("js-"+e),o=null;"list"===n?o=r:"grid"===n&&(o=i),a.insertAdjacentHTML("beforeend",s(o,t))}function d(e,t){t[0].textContent=e.title,t[1].textContent=e.artist,t[2].textContent=e.album,t[3].textContent=e.duration}function f(e,t){var n=e.title.length>64?e.title.slice(0,64)+"...":e.title;t[0].children[0].textContent=e.duration,t[0].children[1].setAttribute("src",e.thumbnail),t[1].setAttribute("title",e.title),t[1].textContent=n}function p(e){var t=document.getElementById("js-"+e.id).children,n=null;n="local-files"===e.id?d:f,e.tracks.forEach(function(e,r){var a=t[r].children;e.index=r,n(e,a)})}function v(e){var t=document.getElementById("js-tab-"+e);t.parentElement.removeChild(t)}function y(e,t){var n=e.offsetHeight,r=e.offsetTop,a=t.scrollTop,i=t.clientHeight,o=a+i;(a>r-n||r>o)&&(t.scrollTop=r-i/2)}function m(e,t,n){var r=document.getElementById("js-"+t),a=r.children[e];g.removeClassFromElement("track","playing"),a.classList.add("playing"),n||y(a,r)}Object.defineProperty(n,"__esModule",{value:!0}),n.showPlayingTrack=n.scrollToTrack=n.append=n.update=n.remove=n.add=void 0;var g=e("./../main.js");n.add=u,n.remove=v,n.update=p,n.append=c,n.scrollToTrack=y,n.showPlayingTrack=m},{"./../main.js":2}],12:[function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(e){return f.some(function(t){return t===e})}function i(e){return window.location.hash.includes(e)}function o(e){return/^playlist\/.+/.test(e)}function s(e){a(e)||f.push(e)}function l(e){window.location.hash="/"+e}function u(e){var t="";return e?"404"===e||a(e)?(t=o(e)?e.slice(e.lastIndexOf("/")+1):e.replace(/\//g,"-"),t&&document.getElementById("js-tab-"+t)?void d.toggleTab(t,"404"===t):void 0):void l("404"):void l("add")}Object.defineProperty(n,"__esModule",{value:!0}),n.isActive=n.toggle=n.add=void 0;var c=e("./main.js"),d=r(c),f=["add","404"];window.addEventListener("hashchange",function(e){var t=e.newURL.split("#/")[1];u(t)}),window.addEventListener("DOMContentLoaded",function p(){var e=window.location.hash.slice(2);Object.keys(localStorage).forEach(function(e){"settings"!==e&&s("playlist/"+e)}),u(e),window.removeEventListener("DOMContentLoaded",p)}),n.add=s,n.toggle=l,n.isActive=i},{"./main.js":2}],13:[function(e,t,n){"use strict";function r(e,t){return i.hasOwnProperty(e)?(i[e]=t,localStorage.setItem("settings",JSON.stringify({repeat:i.repeat,shuffle:i.shuffle,volume:i.volume})),t):void 0}function a(e){return i[e]}Object.defineProperty(n,"__esModule",{value:!0});var i=Object.assign({paused:!0,repeat:!1,shuffle:!1,manual:!1,volume:.2,seeking:!1,activeTab:"add",player:""},JSON.parse(localStorage.getItem("settings"))||{});n.set=r,n.get=a},{}],14:[function(e,t,n){"use strict";function r(e){return document.querySelector("[data-tab-item="+e+"]")}function a(e,t){var n=document.getElementById("js-sidebar-playlist-entries"),r='\n        <li>\n            <a href="#/playlist/'+t+'" class="font-btn sidebar-btn js-tab-select-btn"\n                data-tab-item="'+t+'">\n                <span class="sidebar-playlist-title">'+e+'</span>\n                <span class="icon-volume-up is-playlist-active hidden"></span>\n            </a>\n        </li>';n.insertAdjacentHTML("beforeend",r)}function i(e,t){var n=r(e);n.children[0].textContent=t}function o(e){var t=r(e);t.parentElement.removeChild(t)}function s(e){var t=r(e),n=t.querySelector(".is-playlist-active");n.classList.remove("hidden")}function l(){var e=!0,t=!1,n=void 0;try{for(var r,a=document.querySelectorAll(".js-tab-select-btn")[Symbol.iterator]();!(e=(r=a.next()).done);e=!0){var i=r.value,o=i.children[1];o&&!o.classList.contains("hidden")&&o.classList.add("hidden")}}catch(s){t=!0,n=s}finally{try{!e&&a["return"]&&a["return"]()}finally{if(t)throw n}}}function u(){var e=document.getElementById("js-sidebar-footer");e.classList.contains("show")||e.classList.add("show")}function c(e){var t=document.getElementById("js-player-track-art"),n="./assets/images/album-art-placeholder.png";if(e&&e.thumbnail){var r=e.thumbnail;"object"===("undefined"==typeof r?"undefined":p(r))&&(r=URL.createObjectURL(r)),t.src=r}else t.src=n}function d(e){var t=document.getElementById("js-player-track-info"),n=f(t.children,2),r=n[0],a=n[1];

if(c(e),!e)return r.textContent="",a.textContent="",void(document.title="ve2ry");if(e.artist&&e.title)r.textContent=e.title,a.textContent=e.artist,document.title=e.artist+" - "+e.title;else{var i=e.name||e.title;r.textContent="",a.textContent=i,document.title=i}u()}var f=function(){function e(e,t){var n=[],r=!0,a=!1,i=void 0;try{for(var o,s=e[Symbol.iterator]();!(r=(o=s.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(l){a=!0,i=l}finally{try{!r&&s["return"]&&s["return"]()}finally{if(a)throw i}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(n,"__esModule",{value:!0}),n.createEntry=a,n.editEntry=i,n.removeEntry=o,n.showTrackInfo=d,n.showActiveIcon=s,n.hideActiveIcon=l},{}],15:[function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(){SC.initialize({client_id:"7d6323d8ecbfb64acb9cf2e5f5ef150c"})}function i(e){return e.map(function(e,t){return{index:t,duration:s.formatTime(e.duration/1e3),id:e.id,thumbnail:e.artwork_url||"assets/images/album-art-placeholder.png",title:e.title}})}function o(e){SC.resolve(e).then(function(e){return Array.isArray(e)?{id:"sc-pl-"+e[0].user_id,title:e[0].user.username+" tracks",tracks:i(e)}:{id:"sc-pl-"+e.id,title:e.title,tracks:i(e.tracks)}}).then(u.add)["catch"](function(e){console.log(e),404===e.status&&u.showNotice("Playlist was not found")})}Object.defineProperty(n,"__esModule",{value:!0}),n.fetchPlaylist=n.init=void 0;var s=e("./main.js"),l=e("./playlist/playlist.add.js"),u=r(l);n.init=a,n.fetchPlaylist=o},{"./main.js":2,"./playlist/playlist.add.js":8}],16:[function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function a(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(e){return e.id="yt-pl-"+e.id,e.tracks=e.tracks.map(function(e,t){return{index:t,id:e.snippet.resourceId.videoId,duration:e.snippet.duration,title:e.snippet.title,thumbnail:e.snippet.thumbnails["default"].url}}),delete e.token,e}function o(e){var t=["H","M","S"];return e=e.slice(2),t.map(function(t){var n="";if(e.includes(t)){if(e=e.split(t),2===e.length){var r=Number.parseInt(e[0],10);n+=r>=10?r:"0"+r,"S"!==t&&(n+=":",e=e.slice(1)[0])}}else"S"===t&&(n+="00");return n}).join("")}function s(e){var t=e.items.map(function(e){return e.snippet.resourceId.videoId}).join();return l("videos","contentDetails","id",t).then(function(t){return e.items=e.items.map(function(e,n){return e.snippet.duration=o(t.items[n].contentDetails.duration),e}),e})}function l(e,t,n,r,a){var i="AIzaSyD33Rxm4dA34Mh84oSxYTUUF_jyCLLOua4",o="part="+t+"&"+n+"="+r+"&maxResults=50&key="+i;return a&&(o+="&pageToken="+a),fetch("https://www.googleapis.com/youtube/v3/"+e+"?"+o).then(function(e){return e.json()})["catch"](function(e){console.log(e)})}function u(e){return l("playlistItems","snippet","playlistId",e.id,e.token).then(function(e){return e.items=e.items.filter(function(e){var t=e.snippet.title;return"Deleted video"!==t&&"Private video"!==t}),e}).then(s).then(function(t){var n;return e.token=t.nextPageToken,(n=e.tracks).push.apply(n,a(t.items)),e.token?u(e):e})}function c(e){var t=e.includes("list=")?e.split("list=")[1]:e;l("playlists","snippet","id",t).then(function(e){return e.items.length?{id:t,title:e.items[0].snippet.title,tracks:[]}:void p.showNotice("Playlist was not found")}).then(u).then(i).then(p.add)["catch"](function(e){console.log(e)}),d.scriptLoader.load("https://www.youtube.com/iframe_api")}Object.defineProperty(n,"__esModule",{value:!0}),n.fetchPlaylist=void 0;var d=e("./main.js"),f=e("./playlist/playlist.add.js"),p=r(f);n.fetchPlaylist=c},{"./main.js":2,"./playlist/playlist.add.js":8}],17:[function(e){"use strict";e("./dev/settings.js"),e("./dev/router.js"),e("./dev/main.js"),e("./dev/sidebar.js"),e("./dev/local.js"),e("./dev/youtube.js"),e("./dev/soundcloud.js"),e("./dev/playlist/playlist.add.js"),e("./dev/playlist/playlist.manage.js"),e("./dev/playlist/playlist.view.js"),e("./dev/playlist/playlist.js"),e("./dev/player/player.controls.js"),e("./dev/player/player.js"),e("./dev/player/player.native.js"),e("./dev/player/player.youtube.js"),e("./dev/player/player.soundcloud.js")},{"./dev/local.js":1,"./dev/main.js":2,"./dev/player/player.controls.js":3,"./dev/player/player.js":4,"./dev/player/player.native.js":5,"./dev/player/player.soundcloud.js":6,"./dev/player/player.youtube.js":7,"./dev/playlist/playlist.add.js":8,"./dev/playlist/playlist.js":9,"./dev/playlist/playlist.manage.js":10,"./dev/playlist/playlist.view.js":11,"./dev/router.js":12,"./dev/settings.js":13,"./dev/sidebar.js":14,"./dev/soundcloud.js":15,"./dev/youtube.js":16}]},{},[17]);