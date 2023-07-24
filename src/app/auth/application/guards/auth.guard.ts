import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '@/app/auth/application/services/auth.service';
import { inject } from '@angular/core';
import isEmpty from 'lodash/isEmpty';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  const isUserAuthenticated =
    authService.isCurrentlyAuthenticated || !isEmpty(token);
  const isTokenValid = authService.verifyToken(token);

  if (route && state && isUserAuthenticated && isTokenValid) {
    return true;
  }

  authService.logout();
  return router.navigateByUrl('/login');
};
