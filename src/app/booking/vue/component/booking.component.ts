import { Component, Input } from '@angular/core';
import { BookingService } from '../../application/service/booking.service';
import { Booking } from '@/app/booking/domain/booking';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent {
  @Input() bookings: Booking[] = [];

  displayedColumns: string[] = ['num', 'titre', 'contenu', 'date'];
  constructor(private bookingService: BookingService) {}
}
