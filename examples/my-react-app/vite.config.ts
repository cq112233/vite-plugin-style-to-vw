import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginStyleToVw2 from '../../src/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [

    // {
    //   name:'AS',
    //   transform(code, id){
    //     if(/\.tsx/.test(id)){
    //       console.log(code);
    //     }
    //   }
    // },
    
    react(),
    vitePluginStyleToVw2({
      attributeList:['size']
    })
  ],


})
