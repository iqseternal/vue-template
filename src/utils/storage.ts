
import { aesEncrypt, aesDecrypt, aesEncryptAlgorithm, aesDecryptAlgorithm, isArray } from '@suey/packages';

import { CacheKey } from '@/constants';

import { ckGet, ckRemove, ckSet } from '@suey/packages/storage';

export const getToken = (decrypt = false) => {
  const token = ckGet(CacheKey.TOKEN) as string ?? '';
  if (decrypt) return aesDecrypt(token);

  return token;
}

export const setToken = (token: string, encrypt = true) => {
  if (encrypt) ckSet(CacheKey.TOKEN, aesEncrypt(token), 1);
  else ckSet(CacheKey.TOKEN, token, 1);
}

export const removeToken = () => ckRemove(CacheKey.TOKEN);

export { ckGet, ckRemove, ckSet, loGet, loSet, loRemove, loClear, seGet, seSet, seRemove, seClear } from '@suey/packages/storage';


