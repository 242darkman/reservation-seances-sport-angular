import { NavigationStart, Router } from '@angular/router';

import { AuthService } from '@/app/auth/application/services/auth.service';
import { Injectable } from '@angular/core';
import { UserFacadeService } from '@/app/user/application/facade/user-facade.service';
import { filter } from 'rxjs/operators';

/**
 * Le `AppInitializerService` fournit des méthodes pour initialiser l'application.
 */
@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  constructor(
    private authService: AuthService,
    private userService: UserFacadeService,
    private router: Router
  ) {
    /**
     * À chaque démarrage de la navigation, le service vérifie si le token de l'utilisateur est valide.
     * Si le token n'est pas valide ou si l'utilisateur n'existe pas, le service supprime le token
     * et redirige l'utilisateur vers la page de connexion.
     */
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        this.removeTokenIfUserNotFound();
      });
  }

  /**
   * Supprime le token de l'utilisateur si l'utilisateur n'est pas trouvé.
   */
  removeTokenIfUserNotFound() {
    const token: string = this.authService.getToken();
    if (!token) {
      return;
    }

    const isValidateToken = this.authService.verifyToken(token);
    if (!isValidateToken) {
      void this.router.navigateByUrl('/login');
      return;
    }

    const userId = this.authService.getUserIdFromToken(token);
    const user = this.userService.getUser(userId);

    user.subscribe(u => {
      if (!u) {
        localStorage.removeItem('app_token');
        this.authService.setCurrentUser(null);
        void this.router.navigateByUrl('/login');
      }
      this.authService.setCurrentUser(u);
    });
  }
}
