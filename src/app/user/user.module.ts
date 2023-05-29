import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from '@/app/user/user-routing.module';
import { UserService } from '@/app/user/application/services/user.service';
import { UserFacadeService } from '@/app/user/application/facade/user-facade.service';
@NgModule({
  declarations: [],
  imports: [CommonModule, UserRoutingModule],
  providers: [UserService, UserFacadeService],
})
export class UserModule {}
