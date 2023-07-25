import { NgModule } from '@angular/core';
import { EstablishmentRouting } from '@/app/establishment/establishment-routing';
import { EstablishmentComponent } from '@/app/establishment/vue/components/establishment.component';
import { MatTableModule } from '@angular/material/table';
import { EstablishmentFacadeService } from './application/facade/establishment-face.service';

@NgModule({
  declarations: [EstablishmentComponent],
  imports: [EstablishmentRouting, MatTableModule],
  providers: [EstablishmentFacadeService],
  exports: [],
})
export class EstablishmentModule {}
