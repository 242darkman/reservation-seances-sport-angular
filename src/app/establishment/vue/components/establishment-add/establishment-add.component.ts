import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Establishment } from '@/app/establishment/domain/establishment';
import { EstablishmentFacadeService } from '@/app/establishment/application/facade/establishment-facade.service';
import { OpeningHour } from '@/app/session/domain/session';
import { InMemoryDbService } from 'angular-in-memory-web-api';

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

  constructor(
    private establishmentFacade: EstablishmentFacadeService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EstablishmentAddComponent>,
    private memory: InMemoryDbService,
    @Inject(MAT_DIALOG_DATA) public data: Establishment // You can remove the DialogData interface here
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
    console.log(
      '🚀 ~ file: establishment-add.component.ts:51 ~ EstablishmentAddComponent ~ onConfirmAdd ~ newEstablishment:',
      newEstablishment
    );
    this.establishmentFacade.insertEstablishment(newEstablishment).subscribe();

    // Save the new establishment data
    // this.establishmentFacade.saveNewEstablishment(newEstablishment);

    this.dialogRef.close(newEstablishment);
  }

  onCancelAdd(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }
}
