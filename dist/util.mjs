var l=/(\d+)px/g,b={allReplace:!1,unitToConvert:"px",viewportWidth:750,unitPrecision:5,viewportUnit:"vw",fontViewportUnit:"vw",minPixelValue:1,attributeList:[],include:[],exclude:[]},p=b;if(typeof window<"u")try{p=(await import("/node_modules/vite-plugin-style-to-vw/dist/file.json")).default}catch{}function s(r,e){let n=Math.pow(10,e+1),t=Math.floor(r*n);return Math.round(t/10)*10/n}function o(r,e,n,t){return function(i,u){if(u=Number(u),!u)return i;let a=parseFloat(u);return a<=e?i:s(a/r*100,n)+t}}var f=(r,e={})=>{let n=Object.assign({},p);if(e=Object.assign(n,e),typeof r=="number"||typeof Number(r)=="number"&&!isNaN(Number(r))){let t=r.toString().replace(/(\d+)/g,i=>i.replace(/(\d+)/g,o(e.viewportWidth,e.minPixelValue,e.unitPrecision,"")));return typeof r=="number"?Number(t):t}else return r.toString().replace(l,t=>t.replace(l,o(e.viewportWidth,e.minPixelValue,e.unitPrecision,e.viewportUnit)))};export{f as stylePxToVw};