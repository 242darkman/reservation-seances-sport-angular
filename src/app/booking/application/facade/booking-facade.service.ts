import { Booking } from '@/app/booking/domain/booking';
import { BookingService } from '@/app/booking/application/service/booking.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingFacadeService {
  booking$ = this.bookingService.bookings$;

  constructor(private bookingService: BookingService) {}

  get findBookings(): Booking[] {
    return this.bookingService.findBookings;
  }

  getBookings() {
    this.bookingService.getBookings();
  }

  getBookingsByUserId(id: number) {
    return this.bookingService.getBookingsByUserId(id);
  }

  insertBooking(booking: Booking): Observable<Booking> {
    return this.bookingService.insertBooking(booking);
  }

  updateBooking(booking: Booking, callback: (success: boolean) => void) {
    this.bookingService.updateBooking(booking, callback);
  }

  deleteBooking(id: number, callback: (success: boolean) => void) {
    this.bookingService.deleteBooking(id, callback);
  }

  async bookSession(booking: Booking) {
    return await this.bookingService.bookSession(booking);
  }

  /**
   * Génère un nouvel ID utilisateur via UserService.
   * @return number L'ID généré.
   */
  generateId() {
    return this.bookingService.generateId();
  }
}
