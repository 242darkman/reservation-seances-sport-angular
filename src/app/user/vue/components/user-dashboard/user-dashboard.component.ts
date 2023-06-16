import { AuthService } from '@/app/auth/application/services/auth.service';
import { User } from '@/app/user/domain/user';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import get from 'lodash/get';
import { UserFacadeService } from '@/app/user/application/facade/user-facade.service';
import { isUndefined } from 'lodash';

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
    private snackBar: MatSnackBar,
  ) {
    this.userForm = this.fb.group({
      firstName: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      userName: [{ value: '', disabled: true }],
    });
  }

  ngOnInit() {
    this.user = this.authService.getUser();

    this.userForm = this.fb.group({
      firstName: [{ value: this.user?.firstName, disabled: true }, Validators.required],
      lastName: [{ value: this.user?.lastName, disabled: true }, Validators.required],
      email: [{ value: this.user?.email, disabled: true }, [Validators.required, Validators.email]],
      userName: [{ value: this.user?.userName, disabled: true }],
    });
  }

  toggleEdit() {
    this.editing = !this.editing;
    if (this.editing) {
      this.userForm.enable();
    } else {
      this.userForm.disable();
    }
  }

  updateUser() {
    const id = get(this.user, 'id');
    const userName = get(this.user, 'userName');
    const password = get(this.user, 'password');

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
    const newUser: User = { id, userName, firstName, lastName, email, password };
    this.userService.updateUser(newUser).subscribe({
      next: () => {
        this.snackBar.open('Les informations ont été mise à jour avec succès', 'Fermer', {
          duration: 5000,
          panelClass: ['green-snackbar'],
        });
        this.isLoading = false;
      },
      error: () => this.snackBar.open("Une erreur s'est produite lors de la mise à jour", 'Fermer', { duration: 5000 }),
    });
  }

  getEmailError() {
    if (this.userForm.controls['email'].hasError('required')) {
      return 'Adresse email requis.';
    }
    const error = this.userForm.controls['email'].hasError('email') ? 'Email non valide' : '';
    return error;
  }
}
