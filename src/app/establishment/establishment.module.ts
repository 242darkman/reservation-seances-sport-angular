import { NgModule } from '@angular/core';
import { EstablishmentRouting } from '@/app/establishment/establishment-routing';
import { MatTableModule } from '@angular/material/table';
import { EstablishmentComponent } from '@/app/establishment/vue/components/establishment-card/establishment.component';
import { MatCardModule } from '@angular/material/card';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EstablishmentListComponent } from '@/app/establishment/vue/components/establishment-list/establishment-list.component';
import { EstablishmentPageComponent } from '@/app/establishment/vue/containers/establishment-page/establishment-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstablishmentEditComponent } from '@/app/establishment/vue/components/establishment-edit/establishment-edit.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { EstablishmentAddComponent } from './vue/components/establishment-add/establishment-add.component';


@NgModule({
  declarations: [
    EstablishmentComponent,
    EstablishmentListComponent,
    EstablishmentPageComponent,
    EstablishmentEditComponent,
    EstablishmentAddComponent,
  ],
  imports: [
    EstablishmentRouting,
    MatTableModule,
    MatCardModule,
    NgIf,
    NgOptimizedImage,
    MatIconModule,
    MatButtonModule,
    NgForOf,
    MatDialogModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    
  ],
  providers: [],
  exports: [EstablishmentComponent],
})
export class EstablishmentModule {}
