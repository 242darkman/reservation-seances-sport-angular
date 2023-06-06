import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@/app/home/home.module').then((module) => module.HomeModule),
    pathMatch: 'full',
  },
  { path: 'users/list', loadChildren: () => import('@/app/user/user.module').then((module) => module.UserModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
