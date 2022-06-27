import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path' // 编辑器提示 path 模块找不到，可以yarn add @types/node --dev
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],
      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver()
      ],
      dts: true, // 或自定义路径
      eslintrc: {
        enabled: true // <-- this
      }
    }),
    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver({
          importStyle: 'sass'
          // directives: true,
          // version: "2.1.5",
        })]
    }),
    // Install by Icon Set
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    // 文件系统路径的别名, 绝对路径
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  css: {
    preprocessorOptions: {
      // 按需导入自定义主题
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`
      }
    }
  },
  server: {
    port: 3000, // 指定端口号
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:1313/api',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(new RegExp('^/api'), '')
      }
    }
  }
})
