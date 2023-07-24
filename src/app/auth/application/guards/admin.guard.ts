import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '@/app/auth/application/services/auth.service';
import includes from 'lodash/includes';
import { inject } from '@angular/core';
import isEmpty from 'lodash/isEmpty';

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  const isUserAuthenticated =
    authService.isCurrentlyAuthenticated || !isEmpty(token);
  const isTokenValid = authService.verifyToken(token);
  const userRoles = authService.getUserRoles();
  const isAdmin = includes(userRoles, 'admin');

  if (route && state && isUserAuthenticated && isTokenValid && isAdmin) {
    return true;
  }

  authService.logout();
  return router.navigateByUrl('/login');
};
