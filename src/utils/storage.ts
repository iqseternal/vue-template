
import { aesEncrypt, aesDecrypt, aesEncryptAlgorithm, aesDecryptAlgorithm, isArray } from '@suey/packages';

import { CacheKey } from '@/constants';

import { ckGet, ckRemove, ckSet } from '@suey/packages/storage';

export const getToken = (decrypt = false) => ckGet(CacheKey.TOKEN, { decrypt });

export const setToken = (token: string) => ckSet(CacheKey.TOKEN, token, 1, { encrypt: true });

export const removeToken = () => ckRemove(CacheKey.TOKEN);

export { ckGet, ckRemove, ckSet, loGet, loSet, loRemove, loClear, seGet, seSet, seRemove, seClear } from '@suey/packages/storage';


