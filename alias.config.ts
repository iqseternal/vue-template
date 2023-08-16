import * as path from 'path'
import * as config from './tsconfig.json'
import { AliasOptions, Alias } from 'vite';

const aliasPath: Record<string, any> = config.compilerOptions.paths;

const alias = ((): AliasOptions => {
  const alias: Alias[] = []

  for (const key in aliasPath) {
    alias.push({
      find: key.replace('/*', ''),
      replacement: path.resolve(aliasPath[key][0].replace('/*', ''))
    })
  }
  return alias
})();

export default alias;
