(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{148:function(t,o,a){"use strict";a.r(o),a.d(o,"showDropboxChooser",(function(){return p}));var e=a(93),n=a(1),i=a(44),s=a(0),c=a(71);async function r(t,o=[]){const a=t[o.length],i=await(s=a.audioTrack.link,fetch(s).then(t=>t.blob()));var s;const{duration:c}=await Object(e.a)(i);return o.push({audioTrack:i,durationInSeconds:c,title:a.name,artist:"",album:"",name:a.name,duration:Object(n.b)(c),player:"native"}),o.length===t.length?o:r(t,o)}async function p(){await n.h.load({src:"https://www.dropbox.com/static/api/2/dropins.js",id:"dropboxjs","data-app-key":"6ur73hspbv8o1z9"}),Dropbox.choose({success(t){const o="dropbox",a=Object(s.i)(o)||Object(s.a)({id:o,title:"Dropbox",type:"grid",storePlaylist:c.a.getSetting(o,"storePlaylist")});Object(i.a)(o,a,t,r)},linkType:"direct",multiselect:!0,extensions:["audio"]})}}}]);