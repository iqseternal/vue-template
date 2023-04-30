import { loadEnv } from 'vite';
import type { ProxyOptions } from 'vite';

type Record<K, V> = K extends string ? { [K: string]: V } : V;

const proxy = (mode: string): Record<string, string | ProxyOptions> => {
  const env = loadEnv(mode, __dirname, '');

  return {
    [env.VITE_APP_API]: {
      // target: 'https://mock.mengxuegu.com/mock/63218b5fb4c53348ed2bc212/',
      target: 'https://www.syan.ink:3000/api/v1.0.0',
      ws: true,
      secure: false,
      changeOrigin: true,
      rewrite: path => path.replace(env.VITE_APP_API, '')
    },
    '/bot': {
      target: 'https://localhost:9000',
      secure: false,
      changeOrigin: true,
      rewrite: path => path.replace('/bot', '')
    },
    '/local': {
      target: 'https://localhost:3000',
      secure: false,
      changeOrigin: true,
      rewrite: path => path.replace('/local', '')
    },
  }
};

export default proxy

