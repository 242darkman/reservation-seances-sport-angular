import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@/app/home/home.component';
import { SessionDetailComponent } from '@/app/session/vue/containers/session-detail/session-detail.component';
import { SessionListingPageComponent } from '@/app/session/vue/containers/session-listing-page/session-listing-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'detail/:id',
    component: SessionDetailComponent,
  },
  {
    path: 'establishment/:id',
    component: SessionListingPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
