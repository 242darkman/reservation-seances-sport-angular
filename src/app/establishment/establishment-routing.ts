import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EstablishmentComponent } from '@/app/establishment/vue/establishment.component';

const route: Routes = [
  {
    path: '',
    component: EstablishmentComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class EstablishmentRouting {}
