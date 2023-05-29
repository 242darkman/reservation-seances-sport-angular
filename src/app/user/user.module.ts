import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { UserRoutingModule } from '@/app/user/user-routing.module';
import { UsersPageComponent } from '@/app/user/vue/containers/users-page/users-page.component';
import { UserListComponent } from '@/app/user/vue/components/user-list/user-list.component';
import { UserService } from '@/app/user/application/services/user.service';
import { UserFacadeService } from '@/app/user/application/facade/user-facade.service';

@NgModule({
  declarations: [UsersPageComponent, UserListComponent],
  imports: [CommonModule, UserRoutingModule, MatButtonModule, MatTableModule, MatIconModule],
  providers: [UserService, UserFacadeService],
})
export class UserModule {}
