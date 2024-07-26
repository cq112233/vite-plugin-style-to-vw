import { defineConfig } from 'vite'
import vitePluginStyleToVw from 'vite-plugin-style-to-vw';
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vitePluginStyleToVw2 from '../../src/index'

export default defineConfig({
  plugins: [vitePluginStyleToVw2({
    allReplace:true,
    viewportWidth: 1920, // 设计稿的视口宽度,如传入函数，函数的参数为当前处理的文件路径
  }), vue(),vueJsx()],
})
 