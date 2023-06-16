import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@/app/home/home.module').then((module) => module.HomeModule),
    pathMatch: 'full',
  },
  { path: '', loadChildren: () => import('@/app/user/user.module').then((module) => module.UserModule) },
  {
    path: '',
    loadChildren: () => import('@/app/auth/application/login/login.module').then((module) => module.LoginModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('@/app/auth/application/register/register.module').then((module) => module.RegisterModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
