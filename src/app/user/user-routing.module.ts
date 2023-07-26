import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { UserDashboardComponent } from '@/app/user/vue/components/user-dashboard/user-dashboard.component';
import { UsersPageComponent } from '@/app/user/vue/containers/users-page/users-page.component';
import { adminGuard } from '@/app/auth/application/guards/admin.guard';
import { authGuard } from '@/app/auth/application/guards/auth.guard';

/**
 * Routes de l'application relatives à la gestion des utilisateurs.
 *
 * Cette table de routage contient les routes vers les composants de la page des utilisateurs et du tableau de bord de l'utilisateur.
 * Les routes sont protégées par des gardiens de route (`AuthGuard` et `AdminGuard`).
 *
 * - La route '/users' affiche la page UsersPageComponent et n'est accessible qu'aux utilisateurs ayant le rôle 'admin'.
 * - La route '/account' affiche le UserDashboardComponent et n'est accessible qu'aux utilisateurs authentifiés.
 */
const routes: Routes = [
  {
    path: 'users',
    component: UsersPageComponent,
    canActivate: [authGuard, adminGuard],
  },
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
