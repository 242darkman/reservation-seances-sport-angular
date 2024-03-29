import * as bcrypt from 'bcryptjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, head } from 'lodash';

import { AuthService } from '@/app/auth/application/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@/app/user/domain/user';
import get from 'lodash/get';

/**
 * Composant permettant à l'utilisateur de se connecter à l'application.
 * @selector 'app-login'
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoading = false;
  loginForm: FormGroup;

  /**
   * Construit une instance de LoginComponent.
   * @param {FormBuilder} formBuilder - Permet de construire le groupe de formulaires.
   * @param {AuthService} authService - Service d'authentification.
   * @param {Router} router - Router d'Angular pour naviguer entre les pages.
   */
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Méthode exécutée lors de la soumission du formulaire de connexion.
   * Si le formulaire est valide, elle appelle le service d'authentification pour connecter l'utilisateur,
   * puis navigue vers la page d'accueil.
   */
  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      const userName: string = get(this.loginForm.value, 'username');
      const password: string = get(this.loginForm.value, 'password');
      this.authService.login(userName).subscribe((user: any) => {
        const userToLogged = filter(user, u => {
          const userPassword: string = get(u, 'password');
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const isUserPasswordRight = bcrypt.compareSync(
            password,
            userPassword
          );
          return isUserPasswordRight;
        });
        const loggedUser: User = head(userToLogged);
        this.authService.setCurrentUser(loggedUser);
        const token = this.authService.generateToken(loggedUser);
        localStorage.setItem('app_token', token);
        void this.router.navigateByUrl('/');
        this.isLoading = false;
      });
    }
  }
}
