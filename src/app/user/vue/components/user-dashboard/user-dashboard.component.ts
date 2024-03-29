import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@/app/auth/application/services/auth.service';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@/app/user/domain/user';
import { UserFacadeService } from '@/app/user/application/facade/user-facade.service';
import get from 'lodash/get';
import { isUndefined } from 'lodash';

/**
 * Le composant `UserDashboardComponent` sert à fournir une interface utilisateur pour afficher et modifier les détails de l'utilisateur.
 *
 * @selector `app-user-dashboard`
 * @templateUrl `./user-dashboard.component.html`
 * @styleUrls [`./user-dashboard.component.scss`]
 */
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent {
  userForm: FormGroup;
  editing = false;
  user!: User | null | undefined;
  error!: string;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserFacadeService,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      firstName: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      userName: [{ value: '', disabled: true }],
    });
  }

  /**
   * Au moment de l'initialisation, récupère l'utilisateur à partir du service d'authentification
   * et met à jour le formulaire utilisateur avec les données de l'utilisateur.
   */
  ngOnInit() {
    this.user = this.authService.getUser();

    this.userForm = this.fb.group({
      firstName: [
        { value: this.user?.firstName, disabled: true },
        Validators.required,
      ],
      lastName: [
        { value: this.user?.lastName, disabled: true },
        Validators.required,
      ],
      email: [
        { value: this.user?.email, disabled: true },
        [Validators.required, Validators.email],
      ],
      userName: [{ value: this.user?.userName, disabled: true }],
    });
  }

  /**
   * Bascule l'état d'édition du formulaire et active/désactive les champs du formulaire en conséquence.
   */
  toggleEdit() {
    this.editing = !this.editing;
    if (this.editing) {
      this.userForm.enable();
    } else {
      this.userForm.disable();
    }
  }

  /**
   * Met à jour les informations de l'utilisateur existant.
   * Affiche un message de confirmation en cas de succès, ou un message d'erreur en cas d'échec.
   */
  updateUser() {
    const id = get(this.user, 'id');
    const userName = get(this.user, 'userName');
    const password = get(this.user, 'password');
    const roles = get(this.user, 'roles');

    if (isUndefined(id) || isUndefined(userName) || isUndefined(password)) {
      return;
    }

    if (!this.userForm.valid) {
      return;
    }

    this.isLoading = true;
    this.editing = false;
    const firstName: string = get(this.userForm.value, 'firstName');
    const lastName: string = get(this.userForm.value, 'lastName');
    const email: string = get(this.userForm.value, 'email');
    const updatedUser: User = {
      id,
      userName,
      firstName,
      lastName,
      email,
      password,
      roles: roles as string[],
    };
    this.userService.updateUser(updatedUser, (success: boolean) => {
      if (success) {
        this.authService.setCurrentUser(updatedUser);
        this.snackBar.open(
          'Les informations ont été mise à jour avec succès',
          'Fermer',
          {
            duration: 5000,
            panelClass: ['green-snackbar'],
          }
        );
      } else {
        this.snackBar.open(
          "Une erreur s'est produite lors de la mise à jour",
          'Fermer',
          { duration: 5000 }
        );
      }
      this.isLoading = false;
    });
  }

  /**
   * Vérifie les erreurs dans le champ 'email' du formulaire utilisateur et renvoie un message d'erreur approprié.
   * @returns Un message d'erreur en cas d'erreur, sinon une chaîne vide.
   */
  getEmailError() {
    if (this.userForm.controls['email'].hasError('required')) {
      return 'Adresse email requis.';
    }
    const error = this.userForm.controls['email'].hasError('email')
      ? 'Email non valide'
      : '';
    return error;
  }
}
