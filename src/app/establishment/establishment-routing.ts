import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
//import { EstablishmentListComponent } from '@/app/establishment/vue/components/establishment-list/establishment-list.component';
import { EstablishmentPageComponent } from './vue/containers/establishment-page/establishment-page.component';

const route: Routes = [
  {
    path: 'establishments',
    component: EstablishmentPageComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class EstablishmentRouting {}
