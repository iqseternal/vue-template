import { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router';
import {
  RECEPTION_PATH
} from '@router/constant';

import { splitRoutePath } from '../utils';


export function isReceptionPath(path: string): boolean {
  const modulePath = splitRoutePath(path);

  return modulePath === RECEPTION_PATH;
}


export function receptionGuard(
  router: Router,
  to: RouteLocationNormalized,
  from:RouteLocationNormalized,
  next: NavigationGuardNext
): void {

  next();

}
