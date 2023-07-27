import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Establishment } from '@/app/establishment/domain/establishment';
import { EstablishmentFacadeService } from '@/app/establishment/application/facade/establishment-facade.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface DialogData {
  establishment: Establishment;
}

@Component({
  selector: 'app-establishment-edit',
  templateUrl: './establishment-edit.component.html',
  styleUrls: ['./establishment-edit.component.scss'],
})
export class EstablishmentEditComponent {
  establishmentForm: FormGroup;
  establishment: Establishment = {
    id: 1,
    nom: 'Gymnase Fitness Plus',
    address: '123 Rue du Sport, 75001 Paris, France',
    opening: '07:00',
    close: '22:00',
    imgUrl: 'assets/pictures/porte-maillot-600x400-c-default.png',
    phoneNumber: '+33 1 23 45 67 89',
    openingHours: [
      { dayOfWeek: 'Lundi', startTime: '09:00', endTime: '18:00' },
      { dayOfWeek: 'Jeudi', startTime: '09:00', endTime: '18:00' },
      { dayOfWeek: 'Vendredi', startTime: '09:00', endTime: '18:00' },
      { dayOfWeek: 'Samedi', startTime: '09:00', endTime: '13:00' },
    ],
  };
  editing = false;
  error!: string;
  isLoading = false;

  constructor(
    private establishmentFacade: EstablishmentFacadeService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EstablishmentEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.establishment = { ...data.establishment };
    this.establishmentForm = this.fb.group({
      name: [{ value: '', disabled: true }, Validators.required],
      adresse: [{ value: '', disabled: true }, Validators.required],
      opening: [{ value: '', disabled: true }, Validators.required],
      close: [{ value: '', disabled: true }, Validators.required],
      imgUrl: [{ value: '', disabled: true }, Validators.required],
      phoneNumber: [{ value: '', disabled: true }, Validators.required],
    });
  }

  onConfirmEdit(): void {
    // Vous pouvez ajouter ici la logique pour sauvegarder les modifications de l'établissement
    this.dialogRef.close(this.establishment);
    //this.establishment = this.
  }

  onCancelEdit(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    console.log(
      '🚀 ~ file: establishment-edit.component.ts:67 ~ EstablishmentEditComponent ~ onFileSelected ~ event:',
      event
    );
    /*const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          this.establishment.imgUrl = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }*/
  }

  updateUser() {
    console.log('update fct');
    /*const id = get(this.user, 'id');
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
    });*/
  }
}
