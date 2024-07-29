
# vite-plugin-style-to-vw

一个可以将 标签内样式 px 转换 vw 的 plugin

> 一个可以将 标签内样式 px 转换 vw 的 plugin

## 好用的话给个star哦🙏

[![NPM version](https://img.shields.io/npm/v/vite-plugin-style-to-vw.svg)](https://www.npmjs.com/package/vite-plugin-style-to-vw)

## 说明

- 支持vue,tsx,jsx 文件输入
- 支持对象写法
- 支持行内样式和换行样式
- 支持vue3
- 支持react

## 语言

- [English](https://github.com/cq112233/vite-plugin-style-to-vw/blob/master/README.md)
- [中文](https://github.com/cq112233/vite-plugin-style-to-vw/blob/master/README.zh-CN.md)


## 安装

```
npm install vite-plugin-style-to-vw -D

or
pnpm install vite-plugin-style-to-vw -D

or
yarn add vite-plugin-style-to-vw -D
```


## 使用 

vite.config.js

### vue示例 ,react同理
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
        attributeList:[] ,
        include:[], 
        exclude: [], 
  }), vue()],
});
```

## 开发原因

有些插件会将class中原子化插件的中的class='text-20px' 转换为 class='text-2.6666666666666665vw'，所以写了这个插件,
只转化style中的，

鉴于有些不用原子化插件,又希望全部属性中的px都转换成vw,allReplace 配置选项设置为true即可

## 默认处理 style ，也可以添加额外的属性处理，只支持vue,(react不支持，react请搭配stylePxToVw使用)
```javascript

vitePluginStyleToVw({
    allReplace:false, 
    attributeList:['size','height','width'] // Additional properties that can be handled
})

```
## 全部处理
```javascript

vitePluginStyleToVw({
    allReplace:true, 
})
```


## 示例

### 支持vue,tsx,jsx 文件输入
```html
  // 一行写法
  <h3 style="font-size: 28px;margin-top: 10px;width:500px">Test</h3>

  // 换行写法
  <h3 style="
    font-size: 28px;
    margin-top: 10px;
    width:500px;">
    Test</h3>
    
  // 对象写法
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

### 输出

```html
  // 一行写法
  <h3 style="font-size: 3.73333ww;margin-top: 1.33333vw;width:66.6667vw">Test</h3>

  // 换行写法
  <h3 style="
    font-size: 3.73333ww;
    margin-top: 1.33333vw;
    width:66.6667vw">
    Test</h3>
    
  // 对象写法
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

### react style 添加 !important 生效,请使用以下方式
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

## 如果您想手动使用，请使用以下方法

### 需要安装vite-plugin-top-level-await
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


### 如果你不想转换 请用PX代替

## 配置参数

**默认配置：**

```javascript
{
    allReplace:false, //是否全部属性替换
    unitToConvert: "px", // 需要转换的单位，默认为"px"
    viewportWidth: 750, // 设计稿的视口宽度,如传入函数，函数的参数为当前处理的文件路径
    unitPrecision: 5, // 单位转换后保留的精度
    viewportUnit: "vw", // 希望使用的视口单位
    fontViewportUnit: "vw", // 字体使用的视口单位
    minPixelValue: 1, // 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
    attributeList:[] , // allReplace 为 false使用, ['width','size','height']
    include:[], // 包含某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
    exclude: [], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
}
```