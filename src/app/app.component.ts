import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@/app/auth/application/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated!: boolean;
  private subscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogout() {
    this.authService.logout();
    void this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
    this.subscription = this.authService.isAuthenticated.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
