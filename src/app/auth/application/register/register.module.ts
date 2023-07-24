import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '@/app/auth/application/register/register.component';
import { RegisterRoutingModule } from '@/app/auth/application/register/register-routing.module';

/**
 * Ce module définit le composant d'inscription et les dépendances nécessaires pour le formulaire d'inscription.
 * Il importe également le module `RegisterRoutingModule` pour le routage associé à l'inscription.
 */
@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    RegisterRoutingModule,
  ],
})
export class RegisterModule {}
