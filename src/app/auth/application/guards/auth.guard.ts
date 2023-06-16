import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '@/app/auth/application/services/auth.service';
import { inject } from '@angular/core';
import isEmpty from 'lodash/isEmpty';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  const isUserAuthenticated = authService.isCurrentlyAuthenticated || !isEmpty(token);
  if (route && state && isUserAuthenticated) {
    return true;
  }
  return router.navigateByUrl('/login');
};
