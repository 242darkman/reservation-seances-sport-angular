import { RouterModule, Routes } from '@angular/router';

import { BookingComponent } from '@/app/booking/vue/component/booking.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: 'bookings', component: BookingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
