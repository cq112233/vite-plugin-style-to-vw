# vite-plugin-style-to-vw

A plugin that can convert intra-tag style px to vw 

> A plugin that can convert intra-tag style px to vw / rem 

## Give me a star if it is easy to use

[![NPM version](https://img.shields.io/npm/v/vite-plugin-style-to-vw.svg)](https://www.npmjs.com/package/vite-plugin-style-to-vw)

## Description
- Support vue,tsx,jsx file input
- Supported object writing
- Support in-line and line wrap styles
- Support for vue3
- Support for react

## Language

- [English](https://github.com/cq112233/vite-plugin-style-to-vw/blob/master/README.md)
- [中文](https://github.com/cq112233/vite-plugin-style-to-vw/blob/master/README.zh-CN.md)


## Install

```
npm install vite-plugin-style-to-vw -D

or
pnpm install vite-plugin-style-to-vw -D

or
yarn add vite-plugin-style-to-vw -D
```

## Basic use

### vue example,react is the same
```javascript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginStyleToVw from "vite-plugin-style-to-vw";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vitePluginStyleToVw({
        allReplace:false,
        unitToConvert: "px",
        viewportWidth: 750,
        unitPrecision: 5,
        viewportUnit: "vw",
        fontViewportUnit: "vw",
        minPixelValue: 1,
        attributeList:[]
  }), vue()],
});
```

## Development reasons
Some plug-ins will convert class='text-20px' in the atomic plug-in class to class='text-2.666666666665vw', so I wrote this plug-in, only convert class =' text-20px 'in style

Since some plug-ins do not need to be atomized and want px in all attributes to be converted to vw, you can set the allReplace configuration option to true

## The default processing style can also be added. Only vue,(react is not supported, please use it with stylePxToVw)
```javascript

vitePluginStyleToVw({
    allReplace:false, 
    attributeList:['size','height','width'] // Additional properties that can be handled
})

```
## all processing
```javascript

vitePluginStyleToVw({
    allReplace:true, 
})
```

### Input 
```html

  <h3 style="font-size: 28px;margin-top: 10px;width:500px">Test</h3>

  <h3 style="
    font-size: 28px;
    margin-top: 10px;
    width:500px;">
    Test</h3>
    
  <h3 
  :style="{fontSize:'28px',marginTop: '10px'}">
  Test</h3>

  <h3 
  style={{font-size:'28px';margin-top: '10px'}}>
  Test</h3>

  <h3 
  style=
  {{font-size:'28px';
  margin-top: '10px'}}
  >
  Test</h3>
```

### Output

```html

  <h3 style="font-size: 3.73333ww;margin-top: 1.33333vw;width:66.6667vw">Test</h3>

  <h3 style="
    font-size: 3.73333ww;
    margin-top: 1.33333vw;
    width:66.6667vw">
    Test</h3>
    
  <h3 
  style="font-size: 3.73333ww;margin-top: 1.33333vw；">
  Test</h3>

  <h3 
  style="font-size: 3.73333ww;margin-top: 1.33333vw；">
  Test</h3>

  <h3 
  style="font-size: 3.73333ww;margin-top: 1.33333vw；"
  >
  Test</h3>
  
```

### react style add! important takes effect, please use the following methods
```jsx
import React from 'react'
import './App.css'

function App() {
  return (
    <>
      <div 
        style={{
          height: '100px',
          width: '100px',
          backgroundColor: 'blue',
          paddingBottom: '30px',
        }}
        ref={(el) => {
          if (el) {
            el.style.setProperty('height', '100px', 'important');
            el.style.setProperty('width', '100px', 'important');
            el.style.setProperty('background-color', 'red');
            el.style.setProperty('padding-bottom', '30px', 'important');
          }
        }}>A</div>
    </>
  )
}
export default App
```

## If you want to use it manually, please use the following method
### need install vite-plugin-top-level-await
```
pnpm add vite-plugin-top-level-await -D

```

```javascript
import topLevelAwait from "vite-plugin-top-level-await";
defineConfig({
  plugins: [topLevelAwait({
    promiseExportName: '__tla',
    promiseImportName: (i) => `__tla_${i}`
  })]
})
```

```javascript

import { stylePxToVw } from "vite-plugin-style-to-vw";

const a = stylePxToVw(100)
console.log(a) // 13.3333

const b = stylePxToVw('100')
console.log(b) // 13.3333

const c = stylePxToVw('100px')
console.log(c) // 13.3333vw

const d = stylePxToVw('100px', {
    unitToConvert: "px", // The unit to be converted is "px" by default.
    viewportWidth: 750, // The viewport width of the design draft, such as 
    unitPrecision: 0, // Precision retained after unit conversion.
    viewportUnit: "vw", // Viewport units you want to use.
    fontViewportUnit: "vw", // Viewport units used by fonts.
})
console.log(d) // 13vw

```



### If you don't want to switch, please use PX instead.

## Configuration parameters

**Default configuration**

```javascript
{
    allReplace :false, // Replace all label attributes
    unitToConvert: "px", // The unit to be converted is "px" by default.
    viewportWidth: 750, // The viewport width of the design draft, such as the incoming function, whose parameter is the file path currently processed.
    unitPrecision: 5, // Precision retained after unit conversion.
    viewportUnit: "vw", // Viewport units you want to use.
    fontViewportUnit: "vw", // Viewport units used by fonts.
    minPixelValue: 1, // Set the minimum conversion value. If it is 1, only values greater than 1 will be converted.
    attributeList:[] , // allReplace is false, ['width','size','height']
    include:[], 
    exclude: [], 
}
```