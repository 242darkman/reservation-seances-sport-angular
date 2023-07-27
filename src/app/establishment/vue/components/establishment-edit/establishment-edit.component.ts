import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Establishment } from '@/app/establishment/domain/establishment';
import { EstablishmentFacadeService } from '@/app/establishment/application/facade/establishment-facade.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface DialogData {
  establishment: Establishment;
}

/**
 * @description Composant d'édition d'un établissement.
 * Ce composant est utilisé pour recueillir les modifications sur un établissement existant.
 *
 * @selector app-establishment-edit
 * @component
 */
@Component({
  selector: 'app-establishment-edit',
  templateUrl: './establishment-edit.component.html',
  styleUrls: ['./establishment-edit.component.scss'],
})
export class EstablishmentEditComponent {
  establishmentForm: FormGroup;
  establishment: Establishment;
  editing = false;
  error!: string;
  isLoading = false;

  /**
   * @description Constructeur du composant.
   * Initialise le formulaire d'édition d'un établissement.
   *
   * @param establishmentFacade Service de façade pour les établissements.
   * @param fb Constructeur de formulaire.
   * @param snackBar Barre de notifications.
   * @param dialogRef Référence à la boîte de dialogue.
   * @param data Données de l'établissement à modifier.
   */
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

  /**
   * @description Confirme la modification d'un établissement.
   * Cette méthode est appelée lorsque l'utilisateur appuie sur le bouton de confirmation.
   */
  onConfirmEdit(): void {
    this.dialogRef.close(this.establishment);
  }

  /**
   * @description Annule la modification d'un établissement.
   * Cette méthode est appelée lorsque l'utilisateur appuie sur le bouton d'annulation.
   */
  onCancelEdit(): void {
    this.dialogRef.close();
  }
}
