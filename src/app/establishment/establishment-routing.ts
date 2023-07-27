import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EstablishmentPageComponent } from './vue/containers/establishment-page/establishment-page.component';
import { adminGuard } from '@/app/auth/application/guards/admin.guard';
import { authGuard } from '@/app/auth/application/guards/auth.guard';

const route: Routes = [
  {
    path: 'establishments',
    component: EstablishmentPageComponent,
    canActivate: [authGuard, adminGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class EstablishmentRouting {}
