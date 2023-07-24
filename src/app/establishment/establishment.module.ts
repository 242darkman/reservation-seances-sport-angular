import { NgModule } from '@angular/core';
import { EstablishmentRouting } from '@/app/establishment/establishment-routing';
import { EstablishmentComponent } from '@/app/establishment/vue/establishment.component';

@NgModule({
  declarations: [EstablishmentComponent],
  imports: [EstablishmentRouting],
  providers: [],
  exports: [],
})
export class EstablishmentModule {}
