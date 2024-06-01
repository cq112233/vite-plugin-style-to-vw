# vite-plugin-style-to-vw

A plugin that can convert intra-tag style px to vw

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

vite.config.js

### Vue, must be written before vue ()
```javascript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginStyleToVw from "vite-plugin-style-to-vw";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vitePluginStyleToVw({
        unitToConvert: "px",
        viewportWidth: 750,
        unitPrecision: 5,
        viewportUnit: "vw",
        fontViewportUnit: "vw",
        minPixelValue: 1,
  }), vue()],
});
```

### react 

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginStyleToVw from 'vite-plugin-style-to-vw';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vitePluginStyleToVw(),
    react()
  ],
})
```



## Support for vue,tsx,jsx file import

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


### If you don't want to switch, please use PX instead.

## Configuration parameters

**Default configuration**

```javascript
{
    unitToConvert: "px", // The unit to be converted is "px" by default.
    viewportWidth: 750, // The viewport width of the design draft, such as the incoming function, whose parameter is the file path currently processed.
    unitPrecision: 5, // Precision retained after unit conversion.
    viewportUnit: "vw", // Viewport units you want to use.
    fontViewportUnit: "vw", // Viewport units used by fonts.
    minPixelValue: 1, // Set the minimum conversion value. If it is 1, only values greater than 1 will be converted.
}
```

Draw lessons from vite-plugin-style-vw-loader
https://github.com/gitboyzcf/vite-plugin-style-vw-loader