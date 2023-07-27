import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SessionEstablishmentListingPageComponent } from '@/app/session/vue/containers/session-listing-by-establishment-page/session-establishment-listing-page.component';

const route: Routes = [
  {
    path: ':id',
    component: SessionEstablishmentListingPageComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class SessionRoutingModule {}
