import { NavigationStart, Router } from '@angular/router';

import { AuthService } from '@/app/auth/application/services/auth.service';
import { Injectable } from '@angular/core';
import { UserFacadeService } from '@/app/user/application/facade/user-facade.service';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  constructor(
    private authService: AuthService,
    private userService: UserFacadeService,
    private router: Router
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        this.removeTokenIfUserNotFound();
      });
  }

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
