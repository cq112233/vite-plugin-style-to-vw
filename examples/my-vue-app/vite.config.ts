import { defineConfig } from 'vite'
import vitePluginStyleToVw from 'vite-plugin-style-to-vw';
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vitePluginStyleToVw2 from '../../src/index'

export default defineConfig({
  plugins: [vitePluginStyleToVw2({
    
  }), vue(),vueJsx()],
})
 