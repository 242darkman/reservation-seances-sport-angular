import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Establishment } from '@/app/establishment/domain/establishment';

interface DialogData {
  establishment: Establishment;
}

@Component({
  selector: 'app-establishment-edit',
  templateUrl: './establishment-edit.component.html',
  styleUrls: ['./establishment-edit.component.scss'],
})
export class EstablishmentEditComponent {
  establishment: Establishment; // Vous pouvez définir le type approprié ici en fonction de votre modèle d'établissement

  constructor(
    public dialogRef: MatDialogRef<EstablishmentEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.establishment = { ...data.establishment };
  }

  onConfirmEdit(): void {
    // Vous pouvez ajouter ici la logique pour sauvegarder les modifications de l'établissement
    this.dialogRef.close(this.establishment);
  }

  onCancelEdit(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          this.establishment.imgUrl = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

}
