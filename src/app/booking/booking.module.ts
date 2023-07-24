import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from '../booking/vue/component/booking.component';

@NgModule({
  declarations: [BookingComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    MatButtonModule,
    MatTableModule,
  ],
})
export class BookingModule {}
