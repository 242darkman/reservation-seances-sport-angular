import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDashboardComponent } from './vue/components/user-dashboard/user-dashboard.component';
import { UserFacadeService } from '@/app/user/application/facade/user-facade.service';
import { UserListComponent } from '@/app/user/vue/components/user-list/user-list.component';
import { UserRoutingModule } from '@/app/user/user-routing.module';
import { UserService } from '@/app/user/application/services/user.service';
import { UsersPageComponent } from '@/app/user/vue/containers/users-page/users-page.component';

/**
 * Le `UserModule` fournit les fonctionnalités liées à la gestion des utilisateurs.
 *
 * Il déclare et exporte des composants pour la liste des utilisateurs, le tableau de bord de l'utilisateur,
 * et la page des utilisateurs. Il importe des modules Angular communs et des modules Material pour l'interface utilisateur.
 * Il fournit également des services pour la manipulation des utilisateurs.
 */
@NgModule({
  declarations: [UsersPageComponent, UserListComponent, UserDashboardComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  providers: [UserService, UserFacadeService],
})
export class UserModule {}
