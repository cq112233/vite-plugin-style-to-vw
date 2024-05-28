import { defineConfig } from 'vite'
import vitePluginStyleToVw from 'vite-plugin-style-to-vw';
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vitePluginStyleToVw2 from '../../src/index'

export default defineConfig({
  plugins: [vitePluginStyleToVw2({
    viewportUnit:'vmin',
    // 设计稿尺寸
    unitToConvert: 750,
    // 转换后使用px值
    viewportWidth: 750,
    // 转换后使用px值
    unitPrecision: 6,
    // 允许在媒体查询中转换px
    mediaQuery: false,
    // 转换模式，可选值： 'vw' 或者 'vw-rem'
    selectorBlackList: ['.ignore', '.hairlines'],
  }), vue(),vueJsx()],
})
 