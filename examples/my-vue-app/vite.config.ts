import { defineConfig } from 'vite'
import vitePluginStyleToVw from 'vite-plugin-style-to-vw';
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vitePluginStyleToVw2 from '../../dist/index.mjs'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';


export default defineConfig({
  plugins: [
    vitePluginStyleToVw2({
    allReplace:false,
    viewportWidth: 750, // 设计稿的视口宽度,如传入函数，函数的参数为当前处理的文件路径
    attributeList:[
      'width','height','size'
    ],
    // include:[],
    exclude: [/\App.vue/], // 需要排除的文件
  })
  , vue(),vueJsx(), AutoImport({
    resolvers: [VantResolver()],
  }),
  Components({
    resolvers: [VantResolver()],
  }),],
})
 