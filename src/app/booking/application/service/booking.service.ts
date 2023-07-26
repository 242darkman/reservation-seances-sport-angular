import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Booking } from '../../domain/booking';
import { AuthService } from '@/app/auth/application/services/auth.service';
import { InMemoryDataService } from '@/app/in-memory-data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookings: Booking[] = [];
  private bookingsSubject: BehaviorSubject<Booking[]> = new BehaviorSubject<
    Booking[]
  >(this.bookings);

  constructor(
    private memory: InMemoryDataService,
    private authService: AuthService,
    private router: Router
  ) {}

  // méthode pour générer un id
  generateId(): number {
    const id = this.memory.bookingId(this.bookings);
    return id;
  }

  get bookingAsObservable(): Observable<Booking[]> {
    return this.bookingsSubject.asObservable();
  }
  get bookingAsValue(): Booking[] {
    return this.bookingsSubject.value;
  }
  set updateBooking(booking: Booking[]) {
    this.bookingsSubject.next(booking);
  }

  insertBooking(updatedBooking: Booking): Booking[] {
    const index = this.bookingAsValue.findIndex(
      booking => booking.id === updatedBooking.id
    );
    if (index !== -1) {
      this.bookingAsValue[index] = updatedBooking;
    }
    return this.bookingAsValue;
  }

  // Méthode pour effectuer la réservation
  async bookingSession(book: Booking) {
    const user = this.authService.getUser();
    const userId: number = user?.id ?? -1;
    if (!user || userId === -1) {
      await this.router.navigate(['/login']);
    }
    const newReservation: Booking = {
      id: this.generateId(),
      userId,
      sessionId: book.sessionId,
      timeBook: book.timeBook,
    };
    this.bookings.push(newReservation);
    this.insertBooking(newReservation);
    console.log(this.bookingAsValue);
    return of(newReservation);
  }

  // Méthode pour récupérer toutes les réservations enregistrées en mémoire
  getReservations(): Observable<Booking[]> {
    return of(this.bookings);
  }
}
