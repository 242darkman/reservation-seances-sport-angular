import * as bcrypt from 'bcryptjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserFacadeService } from '@/app/user/application/facade/user-facade.service';
import get from 'lodash/get';

/**
 * Ce composant implémente le formulaire d'inscription de l'application.
 * Il utilise le service `UserFacadeService` pour ajouter de nouveaux utilisateurs et naviguer vers la page de connexion.
 *
 * @example
 * <app-register></app-register>
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  /**
   * Le formulaire d'inscription
   */
  registerForm!: FormGroup;

  /**
   * Indicateur de chargement de la page d'inscription
   */
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserFacadeService
  ) {}

  /**
   * Initialise le formulaire d'inscription et abonne les changements de valeur aux champs de mot de passe.
   */
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.registerForm.controls['password'].valueChanges.subscribe(() => {
      this.checkPassword();
    });

    this.registerForm.controls['confirmPassword'].valueChanges.subscribe(() => {
      this.checkPassword();
    });
  }

  /**
   * Vérifie si les mots de passe saisis dans les champs "password" et "confirmPassword" correspondent.
   * Si les mots de passe ne correspondent pas, une erreur est définie sur le champ "confirmPassword".
   * @private
   */
  private passwordMatch() {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      this.registerForm
        .get('confirmPassword')
        ?.setErrors({ passwordDoesNotMatch: true });
    } else {
      this.registerForm.get('confirmPassword')?.setErrors(null);
    }
  }

  /**
   * Vérifie si les mots de passe saisis dans les champs "password" et "confirmPassword" correspondent.
   */
  checkPassword() {
    this.passwordMatch();
  }

  /**
   * Exécute le processus d'inscription.
   * Si le formulaire est valide, il hache le mot de passe, génère un identifiant pour le nouvel utilisateur,
   * crée un objet utilisateur et utilise le service `UserFacadeService` pour ajouter le nouvel utilisateur.
   */
  onRegister() {
    const salt = bcrypt.genSaltSync(10);
    if (this.registerForm.valid) {
      this.isLoading = true;

      const id: number = this.userService.generateId();
      const userName: string = get(this.registerForm.value, 'userName');
      const firstName: string = get(this.registerForm.value, 'firstName');
      const lastName: string = get(this.registerForm.value, 'lastName');
      const email: string = get(this.registerForm.value, 'email');
      const plainPassword: string = get(this.registerForm.value, 'password');
      const password: string = bcrypt.hashSync(plainPassword, salt);
      const roles = ['user'];
      const user = {
        id,
        userName,
        firstName,
        lastName,
        email,
        password,
        roles,
      };
      this.userService.addUser(user).subscribe(() => {
        void this.router.navigateByUrl('/login');
        this.isLoading = false;
      });
    }
  }
}
