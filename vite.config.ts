/// <reference types="vitest" />

import { defineConfig } from 'vite';

import * as path from 'path';

/** vue组件解析 */
import vue from '@vitejs/plugin-vue';
/** jsx, tsx组件解析 */
import vueJsxPlugin from '@vitejs/plugin-vue-jsx';
/** 路径别名解析, 自动从tsconfig.json中获取配置 */
import alias from './alias.config';
/** 浏览器网络请求代理 */
import proxy from './proxy.config';

import svgLoader from 'vite-svg-loader';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export default defineConfig(({ mode }) => {
  return {
    resolve: { alias },
    css: { preprocessorOptions: { less: { javascriptEnabled:true } } },
    server: {
      https: false,
      host: true,
      port: 8900,
      open: false,
      cors: false, // 跨域策略
      // hmr: true,
      strictPort: false, // 被占用端口是否直接退出
      proxy: proxy(mode)
    },
    build: {
      chunkSizeWarningLimit: 2000, // 消除打包大小超过 500kb 警告

      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ['console.log']
        },
        format: {
          comments: false, // 删除注释
        }
      },
      assetsDir: 'static'
    },
    plugins: [
      vue(), vueJsxPlugin(),

      svgLoader({ defaultImport: "url" }),

      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        symbolId: 'icon-[dir]-[name]'
      })
    ],
  }
})
