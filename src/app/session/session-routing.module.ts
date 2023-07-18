import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {
  SessionListingPageComponent
} from "@/app/session/vue/containers/session-listing-page/session-listing-page.component";
import {SessionDetailComponent} from "@/app/session/vue/containers/session-detail/session-detail.component";

const route: Routes = [
  {
    path: '',
    component: SessionListingPageComponent,
    children: [
      {
        path: 'detail/:id',
        component: SessionDetailComponent
      }
    ]
  },

]
@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class SessionRoutingModule {
}
