import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '@/app/auth/application/services/auth.service';
import { UserFacadeService } from '@/app/user/application/facade/user-facade.service';

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
    const token = this.authService.getToken();
    if (!token) {
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
