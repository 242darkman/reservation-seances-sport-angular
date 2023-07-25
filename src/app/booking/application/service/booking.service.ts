import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Booking } from '../../domain/booking';
import { AuthService } from '@/app/auth/application/services/auth.service';
import { Session } from '@/app/session/domain/session';
import { InMemoryDataService } from '@/app/in-memory-data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookings: Booking[] = [];

  constructor(private memory: InMemoryDataService, private authService: AuthService, private router: Router) {}

  // méthode pour générer un id
  generateId(): number {
    const id = this.memory.bookingId(this.bookings);
    return id;
  }

  // Méthode pour effectuer la réservation
  async bookingSession(session: Session) {
    const user = this.authService.getUser();
    const userId: number = user?.id ?? -1;
    if (!user || userId === -1) {
      await this.router.navigate(['/login']);
    }
    const newReservation: Booking = {
      id: this.generateId(),
      userId,
      sessionId: session.id,
    };

    this.bookings.push(newReservation);
    return of(newReservation);
  }

  // Méthode pour récupérer toutes les réservations enregistrées en mémoire
  getReservations(): Observable<Booking[]> {
    return of(this.bookings);
  }
}
