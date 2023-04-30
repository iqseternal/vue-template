import * as path from 'path'
import * as config from './tsconfig.json'
import { AliasOptions, Alias } from 'vite';

type Record<K, V> = K extends string ? { [K: string]: V } : V;

const aliasPath: Record<string, any> = config.compilerOptions.paths;

const resolve = (dir: string) => path.join(__dirname, dir);

const alias = ((): AliasOptions => {
  const alias: Alias[] = []

  for (const key in aliasPath) {
    alias.push({
      find: key.replace('/*', ''),
      replacement: resolve(aliasPath[key][0].replace('/*', ''))
    })
  }
  return alias
})();

export default alias;
