import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppInitializerService } from '@/app/app-initializer.service';
import { AuthService } from '@/app/auth/application/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '@/app/user/domain/user';
import includes from 'lodash/includes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated!: boolean;
  private subscription!: Subscription;
  year = new Date().getFullYear();
  user!: User | undefined;
  isAdmin!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private appInitializerService: AppInitializerService
  ) {}

  onLogout() {
    this.authService.logout();
    void this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
    this.subscription = this.authService.isAuthenticated.subscribe(
      authenticated => {
        this.isAuthenticated = authenticated;
        this.user = this.authService.getUser();
        const userRoles = this.authService.getUserRoles();
        this.isAdmin = includes(userRoles, 'admin');
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
