# vite-plugin-style-to-vw

一个可以将 标签内样式 px 转换 vw 的 plugin


## 安装

```
npm install vite-plugin-style-to-vw -D

or
pnpm install vite-plugin-style-to-vw -D

or
yarn add vite-plugin-style-to-vw -D
```

## 使用 必须写在vue()前面

vite.config.js

```javascript
import vitePluginStyleToVw from "vite-plugin-style-to-vw";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "./" : "/",
  plugins: [vitePluginStyleToVw({
        unitToConvert: "px",
        viewportWidth: 750,
        unitPrecision: 5,
        viewportUnit: "vw",
        fontViewportUnit: "vw",
        minPixelValue: 1,
  }), vue()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
```

## 示例

### vue 文件

```
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
```

# 也支持tsx,jsx 文件
### 输入
```
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
```
<h3 
  style="font-size: 3.73333ww;margin-top: 1.33333vw；">
  Test</h3>

<h3 
  style="font-size: 3.73333ww;margin-top: 1.33333vw；"
  >
  Test</h3>
```

### 如果你不想转换 请用PX代替

```


## 配置参数

**默认配置：**

```javascript
{
    unitToConvert: "px", // 需要转换的单位，默认为"px"
    viewportWidth: 750, // 设计稿的视口宽度,如传入函数，函数的参数为当前处理的文件路径
    unitPrecision: 5, // 单位转换后保留的精度
    viewportUnit: "vw", // 希望使用的视口单位
    fontViewportUnit: "vw", // 字体使用的视口单位
    minPixelValue: 1, // 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
}
```

借鉴 vite-plugin-style-vw-loader
https://github.com/gitboyzcf/vite-plugin-style-vw-loader