import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { UserDashboardComponent } from '@/app/user/vue/components/user-dashboard/user-dashboard.component';
import { UsersPageComponent } from '@/app/user/vue/containers/users-page/users-page.component';
import { adminGuard } from '@/app/auth/application/guards/admin.guard';
import { authGuard } from '@/app/auth/application/guards/auth.guard';

const routes: Routes = [
  { path: 'users', component: UsersPageComponent, canActivate: [adminGuard] },
  {
    path: 'account',
    component: UserDashboardComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
