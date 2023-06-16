import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserRoutingModule } from '@/app/user/user-routing.module';
import { UserService } from '@/app/user/application/services/user.service';
import { UserFacadeService } from '@/app/user/application/facade/user-facade.service';
import { UserListComponent } from '@/app/user/vue/components/user-list/user-list.component';
import { UsersPageComponent } from '@/app/user/vue/containers/users-page/users-page.component';
import { UserDashboardComponent } from './vue/components/user-dashboard/user-dashboard.component';

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
