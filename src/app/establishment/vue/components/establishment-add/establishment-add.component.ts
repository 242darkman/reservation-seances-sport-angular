import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Establishment } from '@/app/establishment/domain/establishment';
import { EstablishmentFacadeService } from '@/app/establishment/application/facade/establishment-facade.service';
import { OpeningHour } from '@/app/session/domain/session';
import { InMemoryDbService } from 'angular-in-memory-web-api';

/**
 * @description Composant d'ajout d'un établissement.
 * Ce composant est utilisé pour recueillir les informations sur un nouvel établissement à ajouter à la base de données.
 *
 * @selector app-establishment-add
 * @component
 */
@Component({
  selector: 'app-establishment-add',
  templateUrl: './establishment-add.component.html',
  styleUrls: ['./establishment-add.component.scss'],
})
export class EstablishmentAddComponent {
  establishmentForm: FormGroup;
  selectedFile: File | null = null;
  error!: string;
  isLoading = false;

  /**
   * @description Constructeur du composant.
   * Initialise le formulaire d'ajout d'un établissement.
   *
   * @param establishmentFacade Service de façade pour les établissements.
   * @param fb Constructeur de formulaire.
   * @param dialogRef Référence à la boîte de dialogue.
   * @param memory Service en mémoire pour les données web.
   * @param data Données de l'établissement à ajouter.
   */
  constructor(
    private establishmentFacade: EstablishmentFacadeService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EstablishmentAddComponent>,
    private memory: InMemoryDbService,
    @Inject(MAT_DIALOG_DATA) public data: Establishment
  ) {
    this.establishmentForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      opening: ['', Validators.required],
      close: ['', Validators.required],
      imgUrl: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  /**
   * @description Confirme l'ajout d'un établissement.
   * Cette méthode est appelée lorsque l'utilisateur appuie sur le bouton de confirmation.
   */
  onConfirmAdd(): void {
    if (this.selectedFile === null) {
      return;
    }
    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);

    const newEstablishment: Establishment = {
      id: this.establishmentFacade.generateId(),
      nom: this.establishmentForm.value.name,
      address: this.establishmentForm.value.address,
      opening: this.establishmentForm.value.opening,
      close: this.establishmentForm.value.close,
      imgUrl: this.selectedFile.name,
      phoneNumber: this.establishmentForm.value.phoneNumber,
      openingHours: [
        { dayOfWeek: 'Lundi', startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Jeudi', startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Vendredi', startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 'Samedi', startTime: '09:00', endTime: '13:00' },
      ] as Pick<OpeningHour, 'startTime' | 'endTime' | 'dayOfWeek'>[],
    };
    this.establishmentFacade.insertEstablishment(newEstablishment).subscribe();

    this.dialogRef.close(newEstablishment);
  }

  /**
   * @description Annule l'ajout d'un établissement.
   * Cette méthode est appelée lorsque l'utilisateur appuie sur le bouton d'annulation.
   */
  onCancelAdd(): void {
    this.dialogRef.close();
  }

  /**
   * @description Gère la sélection d'un fichier par l'utilisateur.
   * Cette méthode est appelée lorsque l'utilisateur sélectionne un fichier.
   *
   * @param event L'événement de sélection du fichier.
   */
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }
}
