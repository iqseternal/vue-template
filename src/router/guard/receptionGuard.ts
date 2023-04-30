import { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router'
import {

} from '@router/constant'

export function receptionGuard(
  router: Router,
  to: RouteLocationNormalized,
  from:RouteLocationNormalized,
  next: NavigationGuardNext
): void {

  next();

}
