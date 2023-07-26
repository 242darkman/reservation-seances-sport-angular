import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EstablishmentListComponent } from '@/app/establishment/vue/components/establishment-list/establishment-list.component';

const route: Routes = [
  {
    path: '',
    component: EstablishmentListComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class EstablishmentRouting {}
