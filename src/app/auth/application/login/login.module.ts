import { AuthService } from '@/app/auth/application/services/auth.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '@/app/auth/application/login/login.component';
import { LoginRoutingModule } from '@/app/auth/application/login/login-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Ce module fournit tous les composants et services nécessaires pour le processus de connexion.
 * Il importe également les modules nécessaires pour l'interface utilisateur du formulaire de connexion.
 */
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    LoginRoutingModule,
  ],
  providers: [AuthService],
})
export class LoginModule {}
