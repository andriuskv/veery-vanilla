(self.webpackChunkveery=self.webpackChunkveery||[]).push([[531],{4531:(t,e,o)=>{o.r(e),o.d(e,{showDropboxChooser:()=>l});var a=o(8435),s=o(5365),n=o(6509),i=o(1931),r=o(2064);async function c(t,e=[]){const o=t[e.length],n=await(i=o.audioTrack.link,fetch(i).then((t=>t.blob())));var i;const{duration:r}=await(0,a.Z)(n);return e.push({audioTrack:n,durationInSeconds:r,title:o.name,artist:"",album:"",name:o.name,duration:(0,s.mr)(r),player:"native"}),e.length===t.length?e:c(t,e)}async function l(){await s.Vs.load({src:"https://www.dropbox.com/static/api/2/dropins.js",id:"dropboxjs","data-app-key":"6ur73hspbv8o1z9"}),Dropbox.choose({success(t){const e="dropbox",o=(0,i.hT)(e)||(0,i.cg)({id:e,title:"Dropbox",type:"grid",storePlaylist:r.s.getSetting(e,"storePlaylist")});(0,n._j)(e,o,t,c)},linkType:"direct",multiselect:!0,extensions:["audio"]})}}}]);