import R from"fs";var v;typeof window>"u"&&(v=await import("rollup-pluginutils"));var m={allReplace:!1,unitToConvert:"px",viewportWidth:750,unitPrecision:5,viewportUnit:"vw",fontViewportUnit:"vw",minPixelValue:1,attributeList:[],include:[],exclude:[]};function d(e,l){let u=Math.pow(10,l+1),s=Math.floor(e*u);return Math.round(s/10)*10/u}function c(e,l,u,s){return function(p,t){if(t=Number(t),!t)return p;let w=parseFloat(t);return w<=l?p:d(w/e*100,u)+s}}var S=m,x=/<template>([\s\S]+)<\/template>/gi,y=/(\d+)px/g,j=/style\s*(:|=)\s*(?:"([^"]*?)"|'([^']*?)'|{([^}]*)})/g,N=/(\w+)=\s*(?:"([^"]*?)"|'([^']*?)'|{([^}]*)})/g,P=/style.setProperty\(.*\)/g,V=(e,l,u)=>{if(Array.isArray(l)&&l.length){for(let s=0;s<l.length;s++){let p=e,t=l[s],w=new RegExp(`${t}s*(:|=)s*(?:"([^"]*?)"|'([^']*?)'|{([^}]*)})`,"g"),a=e.match(w);if(a?.length){let g=[];for(let i=0;i<a.length;i++){let r=a[i].replace(y,b=>b.replace(y,c(u.viewportWidth,u.minPixelValue,u.unitPrecision,u.viewportUnit)));g.push(r)}let n=e;for(let i=0;i<a.length;i++)n=n.replace(a[i],`${g[i]}`);e=e.replace(p,n)}}return e}else return e};function M(e=m){if(typeof window<"u")return console.warn("Please use it in node environment !!!");let l=Object.assign({},m);e=Object.assign(l,e);let u=v.createFilter(e.include,e.exclude);try{R.writeFileSync(process.cwd()+"/node_modules/vite-plugin-style-to-vw/dist/file.json",JSON.stringify(e),"utf8")}catch{}let s=e.allReplace,p=s?N:j;return{name:"vite-plugin-style-to-vw",enforce:"pre",transform(t,w){if(u(w)){if(/.vue$/.test(w)){let a="",g="";if(x.test(t)?(a=t.match(x)[0],g=t.match(x)[0]):t.includes("setup")&&(a=t,g=t),p.test(a)){let n=a.match(p);if(n?.length){let i=[];for(let r=0;r<n.length;r++){let o=n[r].replace(y,h=>h.replace(y,c(e.viewportWidth,e.minPixelValue,e.unitPrecision,e.viewportUnit)));i.push(o)}let f=a;for(let r=0;r<n.length;r++)f=f.replace(n[r],`${i[r]}`);t=t.replace(g,f)}}s||(t=V(t,e.attributeList,e))}else if(/\.tsx|\.jsx$/.test(w)){let a=t,g=t;if(p.test(a)){let n=a.match(p);if(n?.length){let i=[];for(let r=0;r<n.length;r++){let o=n[r].replace(y,h=>h.replace(y,c(e.viewportWidth,e.minPixelValue,e.unitPrecision,e.viewportUnit)));i.push(o)}let f=a;for(let r=0;r<n.length;r++)f=f.replace(n[r],`${i[r]}`);t=t.replace(g,f),g=t,a=t}}if(s||(t=V(t,e.attributeList,e)),P.test(a)){let n=a.match(P);if(n?.length){let i=[];for(let r=0;r<n.length;r++){let o=n[r].replace(y,h=>h.replace(y,c(e.viewportWidth,e.minPixelValue,e.unitPrecision,e.viewportUnit)));i.push(o)}let f=a;for(let r=0;r<n.length;r++)f=f.replace(n[r],`${i[r]}`);t=t.replace(t,f)}}}}return{code:t,map:null}}}}var W=M;if(typeof window<"u")try{S=(await import("/node_modules/vite-plugin-style-to-vw/dist/file.json")).default}catch{}var C=(e,l={})=>{let u=Object.assign({},S);if(l=Object.assign(u,l),typeof e=="number"||typeof Number(e)=="number"&&!isNaN(Number(e))){let s=e.toString().replace(/(\d+)/g,p=>p.replace(/(\d+)/g,c(l.viewportWidth,l.minPixelValue,l.unitPrecision,"")));return typeof e=="number"?Number(s):s}else return e.toString().replace(y,s=>s.replace(y,c(l.viewportWidth,l.minPixelValue,l.unitPrecision,l.viewportUnit)))};export{W as default,C as stylePxToVw};
