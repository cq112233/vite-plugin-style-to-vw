import v from"fs";var h={allReplace:!1,unitToConvert:"px",viewportWidth:750,unitPrecision:5,viewportUnit:"vw",fontViewportUnit:"vw",minPixelValue:1};function b(e,i){let a=Math.pow(10,i+1),r=Math.floor(e*a);return Math.round(r/10)*10/a}function o(e,i,a,r){return function(y,l){if(l=Number(l),!l)return y;let u=parseFloat(l);return u<=i?y:b(u/e*100,a)+r}}var x=h,w=/<template>([\s\S]+)<\/template>/gi,f=/(\d+)px/g,S=/style\s*(:|=)\s*(?:"([^"]*?)"|'([^']*?)'|{([^}]*)})/g,m=/(\w+)=\s*(?:"([^"]*?)"|'([^']*?)'|{([^}]*)})/g,V=/style.setProperty\(.*\)/g;function R(e=h){e=Object.assign(h,e);try{v.writeFileSync(__dirname+"/file.json",JSON.stringify(e),"utf8")}catch{}let a=e.allReplace?m:S;return{name:"vite-plugin-style-to-vw",enforce:"pre",transform(r,y){if(/.vue$/.test(y)){let l="",u="";if(w.test(r)?(l=r.match(w)[0],u=r.match(w)[0]):r.includes("setup")&&(l=r,u=r),a.test(l)){let n=l.match(a);if(n?.length){let p=[];for(let t=0;t<n.length;t++){let c=n[t].replace(f,g=>g.replace(f,o(e.viewportWidth,e.minPixelValue,e.unitPrecision,e.viewportUnit)));p.push(c)}let s=l;for(let t=0;t<n.length;t++)s=s.replace(n[t],`${p[t]}`);r=r.replace(u,s)}}}else if(/\.tsx|\.jsx$/.test(y)){let l=r,u=r;if(a.test(l)){let n=l.match(a);if(n?.length){let p=[];for(let t=0;t<n.length;t++){let c=n[t].replace(f,g=>g.replace(f,o(e.viewportWidth,e.minPixelValue,e.unitPrecision,e.viewportUnit)));p.push(c)}let s=l;for(let t=0;t<n.length;t++)s=s.replace(n[t],`${p[t]}`);r=r.replace(u,s),u=r,l=r}}if(V.test(l)){let n=l.match(V);if(n?.length){let p=[];for(let t=0;t<n.length;t++){let c=n[t].replace(f,g=>g.replace(f,o(e.viewportWidth,e.minPixelValue,e.unitPrecision,e.viewportUnit)));p.push(c)}let s=l;for(let t=0;t<n.length;t++)s=s.replace(n[t],`${p[t]}`);r=r.replace(r,s)}}}return{code:r,map:null}}}}var j=R;if(typeof window<"u")try{x=(await import("./file.json")).default}catch{}var M=(e,i={})=>{if(i=Object.assign(x,i),typeof e=="number"||typeof Number(e)=="number"&&!isNaN(Number(e))){let a=e.toString().replace(/(\d+)/g,r=>r.replace(/(\d+)/g,o(i.viewportWidth,i.minPixelValue,i.unitPrecision,"")));return typeof e=="number"?Number(a):a}else return e.toString().replace(f,a=>a.replace(f,o(i.viewportWidth,i.minPixelValue,i.unitPrecision,i.viewportUnit)))};export{j as default,M as stylePxToVw};
