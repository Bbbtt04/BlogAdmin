import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'

import VueSetupExtend from 'vite-plugin-vue-setup-extend'


// jsx
import vueJsx from '@vitejs/plugin-vue-jsx'

const pathSrc = resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '~/': `${pathSrc}/`,
      '@/': `${pathSrc}/`,
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "~/assets/scss/theme.scss" as *;',
      },
    },
  },
  server: {
    port: 4000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://43.143.177.227:4000/',
        changeOrigin: true, // 允许跨域
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
    hmr:{
      overlay: false
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      dirs: ['src/hooks', 'src/store/modules'],
      imports: ['vue', 'vue-router', 'pinia'],
      dts: resolve(pathSrc, 'types/auto-import.d.ts'),
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dts: resolve(pathSrc, 'types/components.d.ts'),
      resolvers: [ElementPlusResolver(), IconsResolver({ componentPrefix: '' })],
    }),
    Icons({
      compiler: 'vue3',
      scale: 1.5,
    }),
    Unocss({
      presets: [presetUno(), presetAttributify()],
    }),
    VueSetupExtend()
  ],
})
