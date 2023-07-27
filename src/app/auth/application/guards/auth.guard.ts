import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '@/app/auth/application/services/auth.service';
import { inject } from '@angular/core';

/**
 * Le garde d'authentification (auth guard) sert à protéger les routes et à vérifier si l'utilisateur est authentifié.
 * Si l'utilisateur est authentifié et que le token est valide, l'accès à la route est autorisé.
 * Sinon, l'utilisateur est déconnecté et redirigé vers la page de login.
 * @param {ActivatedRouteSnapshot} route - Instantané de la route active.
 * @param {RouterStateSnapshot} state - L'état du routeur.
 * @returns {boolean | UrlTree} - Renvoie vrai si l'utilisateur peut accéder à la route, ou une UrlTree vers la page de login dans le cas contraire.
 */
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  const user = authService.getUser();
  const isUserAuthenticated = !!user;
  const isTokenValid = authService.verifyToken(token);

  if (route && state && isUserAuthenticated && isTokenValid) {
    return true;
  }

  authService.logout();
  return router.navigateByUrl('/login');
};
