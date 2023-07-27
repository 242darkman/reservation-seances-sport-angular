import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppInitializerService } from '@/app/app-initializer.service';
import { AuthService } from '@/app/auth/application/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { User } from '@/app/user/domain/user';
import includes from 'lodash/includes';

/**
 * Le composant `AppComponent` est le composant racine de l'application.
 * Il contient des méthodes pour la gestion de l'authentification et de la navigation utilisateur.
 *
 * @selector `app-root`
 * @templateUrl `./app.component.html`
 * @styleUrls [`./app.component.scss`]
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated!: boolean;
  private subscription!: Subscription;
  year = new Date().getFullYear();
  user!: User | null;
  isAdmin!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private appInitializerService: AppInitializerService,
    private toastr: ToastrService
  ) {}

  /**
   * Méthode pour gérer la déconnexion de l'utilisateur.
   * Elle supprime les informations de l'utilisateur du service d'authentification et redirige vers la page d'accueil.
   */
  onLogout() {
    this.authService.logout();
    void this.router.navigateByUrl('/');
    this.toastr.success('Vous vous êtes déconnecté avec succès !');
  }

  /**
   * Au moment de l'initialisation, s'abonne au flux de l'utilisateur courant fourni par le service d'authentification.
   * Met à jour les informations de l'utilisateur et les droits d'accès en fonction des données reçues.
   */
  ngOnInit(): void {
    this.subscription = this.authService.currentUser$.subscribe(user => {
      if (this.user !== user) {
        this.user = user;
      }

      this.isAuthenticated = !!user;
      this.user = user;
      this.isAdmin = user ? includes(user.roles, 'admin') : false;
    });
  }

  /**
   * Avant la destruction du composant, désabonne du flux de l'utilisateur courant pour éviter les fuites de mémoire.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
