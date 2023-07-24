import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { RegisterComponent } from '@/app/auth/application/register/register.component';

/**
 * Définit les routes pour le module d'inscription.
 * @type {Routes}
 */
const routes: Routes = [{ path: 'register', component: RegisterComponent }];

/**
 * Ce module fournit la configuration de routage pour le composant d'inscription.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
