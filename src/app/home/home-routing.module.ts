import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '@/app/home/home.component';
import { NgModule } from '@angular/core';
import { SessionDetailComponent } from '@/app/session/vue/containers/session-detail/session-detail.component';
import { SessionEstablishmentListingPageComponent } from '@/app/session/vue/containers/session-listing-by-establishment-page/session-establishment-listing-page.component';
import { SessionsListingAllComponent } from '@/app/session/vue/containers/sessions-listing-all/sessions-listing-all.component';

/**
 * Configuration des routes pour le module Home.
 * Inclut le routage vers HomeComponent et SessionDetailComponent.
 */
const routes: Routes = [
  {
    // Route vers le HomeComponent.
    // C'est la route par défaut lorsque aucun chemin n'est spécifié.
    path: '',
    component: HomeComponent,
  },
  {
    // Route vers le SessionDetailComponent.
    // Elle nécessite un paramètre id pour récupérer le détail de la session spécifiée.
    path: 'detail/:id',
    component: SessionDetailComponent,
  },
  {
    path: 'establishment/:id',
    component: SessionEstablishmentListingPageComponent,
  },
  {
    path: 'all-session',
    component: SessionsListingAllComponent,
  },
];

/**
 * Module de gestion de routage au sein du module Home.
 *
 * @NgModule
 */
@NgModule({
  /**
   * Importe le RouterModule et le configure avec les routes en une seule étape en appelant RouterModule.forChild().
   * La méthode est appelée forChild() car elle configure le routeur au niveau enfant.
   */
  imports: [RouterModule.forChild(routes)],
  /**
   * L'exportation de RouterModule rend les directives de routage disponibles pour une utilisation dans les composants du module Home.
   */
  exports: [RouterModule],
})
export class HomeRoutingModule {}
