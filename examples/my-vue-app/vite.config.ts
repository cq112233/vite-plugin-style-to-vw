import { defineConfig } from 'vite'
import vitePluginStyleToVw from 'vite-plugin-style-to-vw';
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vitePluginStyleToVw2 from '../../src/index'

export default defineConfig({
  plugins: [vitePluginStyleToVw2({
    unitToConvert: "px", // 需要转换的单位，默认为"px"
    viewportWidth: 750, // 设计稿的视口宽度,如传入函数，函数的参数为当前处理的文件路径
    unitPrecision: 5, // 单位转换后保留的精度
    viewportUnit: "vw", // 希望使用的视口单位
    fontViewportUnit: "vw", // 字体使用的视口单位
    minPixelValue: 1, // 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
  }), vue(),vueJsx()],
})
 