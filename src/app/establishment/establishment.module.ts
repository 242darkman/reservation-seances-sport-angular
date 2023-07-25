import { NgModule } from '@angular/core';
import { EstablishmentRouting } from '@/app/establishment/establishment-routing';
import { MatTableModule } from '@angular/material/table';
import { EstablishmentComponent } from '@/app/establishment/vue/components/establishment-card/establishment.component';
import { MatCardModule } from '@angular/material/card';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EstablishmentListComponent } from '@/app/establishment/vue/components/establishment-list/establishment-list.component';

@NgModule({
  declarations: [EstablishmentComponent, EstablishmentListComponent],
  imports: [
    EstablishmentRouting,
    MatTableModule,
    MatCardModule,
    NgIf,
    NgOptimizedImage,
    MatIconModule,
    MatButtonModule,
    NgForOf,
  ],
  providers: [],
  exports: [EstablishmentComponent],
})
export class EstablishmentModule {}
