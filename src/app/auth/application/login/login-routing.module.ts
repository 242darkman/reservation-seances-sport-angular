import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';

/**
 * Définit les routes pour le module de connexion.
 * @type {Routes}
 */
const routes: Routes = [{ path: 'login', component: LoginComponent }];

/**
 * Ce module fournit la configuration de routage pour le composant de connexion.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
