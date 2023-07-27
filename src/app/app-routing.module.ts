import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

/**
 * `routes` est une configuration des chemins d'accès dans notre application.
 * Chaque chemin est associé à un module spécifique qui est chargé à la demande (lazy-loaded) lorsque l'utilisateur navigue vers ce chemin.
 */
const routes: Routes = [
  {
    // Ce chemin correspond à la racine de l'application.
    // Le module associé est le HomeModule.
    path: '',
    loadChildren: () =>
      import('@/app/home/home.module').then(module => module.HomeModule),
    pathMatch: 'full',
  },
  {
    // Ce chemin correspond également à la racine de l'application.
    // Le module associé est le UserModule.
    path: '',
    loadChildren: () =>
      import('@/app/user/user.module').then(module => module.UserModule),
  },
  {
    // Ce chemin correspond également à la racine de l'application.
    // Le module associé est le LoginModule.
    path: '',
    loadChildren: () =>
      import('@/app/auth/application/login/login.module').then(
        module => module.LoginModule
      ),
  },
  {
    // Ce chemin correspond également à la racine de l'application.
    // Le module associé est le RegisterModule.
    path: '',
    loadChildren: () =>
      import('@/app/auth/application/register/register.module').then(
        module => module.RegisterModule
      ),
  },
];

/**
 * `AppRoutingModule` configure le routeur d'application à un niveau supérieur
 * avec les routes et les autres paramètres du routeur.
 * Le routeur est en attente de navigation une fois que l'application est stable.
 */
@NgModule({
  /**
   * `RouterModule.forRoot(routes)` fournit la configuration de routage pour le module.
   * `forRoot` configure également le fournisseur de service du routeur.
   */
  imports: [RouterModule.forRoot(routes)],
  /**
   * `exports` rend `RouterModule` disponible dans tout le reste de l'application.
   */
  exports: [RouterModule],
})
/**
 * La classe `AppRoutingModule` fournit un module de routage qui donne aux composants d'application accès à la fonctionnalité de routage.
 */
export class AppRoutingModule {}
