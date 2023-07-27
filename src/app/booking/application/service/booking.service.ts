import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '@/app/auth/application/services/auth.service';
import { BOOKINGS } from '@/app/booking/mock/mock-booking';
import { Booking } from '@/app/booking/domain/booking';
import { InMemoryDataService } from '@/app/in-memory-data.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import get from 'lodash/get';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private bookingUrl = 'api/bookings';
  private bookingsSubject: BehaviorSubject<Booking[]> = new BehaviorSubject<
    Booking[]
  >([]);
  bookings$ = this.bookingsSubject.asObservable();

  constructor(
    private memory: InMemoryDataService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  get bookingAsObservable(): Observable<Booking[]> {
    return this.bookingsSubject.asObservable();
  }

  get findBookings(): Booking[] {
    return this.bookingsSubject.value;
  }

  set setBooking(booking: Booking[]) {
    this.bookingsSubject.next(booking);
  }

  insertBooking(booking: Booking): Observable<Booking> {
    return this.http
      .post<Booking>(this.bookingUrl, booking, this.httpOptions)
      .pipe(
        tap(newBooking => {
          const currentValue = this.bookingsSubject.getValue();
          this.bookingsSubject.next([...currentValue, newBooking]);
        }),
        catchError(this.handleError<Booking>('insertBooking'))
      );
  }

  /**
   * Met à jour un booking existant et met à jour le `BehaviorSubject` avec la nouvelle liste des bookings.
   * @param booking - Le booking à mettre à jour.
   * @param callback - La fonction à exécuter après la mise à jour du booking.
   */
  updateBooking(booking: Booking, callback: (success: boolean) => void): void {
    const bookingId = get(booking, 'id');
    const url = `${this.bookingUrl}/${bookingId}`;
    this.http
      .put<Booking>(url, booking, this.httpOptions)
      .pipe(
        tap(updatedBooking => {
          const currentValue = this.bookingsSubject.getValue();
          const updatedBookings = currentValue.map(u =>
            u.id === updatedBooking.id ? updatedBooking : u
          );
          this.bookingsSubject.next(updatedBookings);
          callback(true);
        }),
        catchError(err => {
          this.handleError<Booking>(`updateBooking ${err.message}`);
          callback(false);
          return of(null);
        })
      )
      .subscribe();
  }

  /**
   * Supprime un booking par son `id` et met à jour le `BehaviorSubject` avec la nouvelle liste des bookings.
   * @param id - L'identifiant du booking à supprimer.
   * @param callback - La fonction à exécuter après la suppression du booking.
   */
  deleteBooking(id: number, callback: (success: boolean) => void): void {
    const url = `${this.bookingUrl}/${id}`;
    this.http
      .delete<Booking>(url, this.httpOptions)
      .pipe(
        tap(() => {
          const currentValue = this.bookingsSubject.getValue();
          const updatedBookings = currentValue.filter(
            booking => booking.id !== id
          );
          this.bookingsSubject.next(updatedBookings);
          callback(true);
        }),
        catchError(this.handleError<Booking>('deleteBooking'))
      )
      .subscribe({
        error: err => {
          console.error(err);
          callback(false);
        },
      });
  }

  async bookSession(booking: Booking) {
    const bookingId = get(booking, 'id');
    const sessionId = get(booking, 'sessionId');
    const timeBook = get(booking, 'timeBook');
    const user = this.authService.getUser();
    const userId = get(user, 'id');

    if (!userId) {
      await this.router.navigate(['/login']);
      return;
    }
    const newReservation: Booking = {
      id: bookingId,
      userId,
      sessionId,
      timeBook,
    };
    this.insertBooking(newReservation);
    console.log(this.findBookings);
  }

  /**
   * Récupère la liste actuelle des bookings depuis l'API et met à jour le `BehaviorSubject`.
   */
  getBookings(): void {
    this.http
      .get<Booking[]>(this.bookingUrl)
      .pipe(tap(), catchError(this.handleError<Booking[]>('getBookings', [])))
      .subscribe(bookings => {
        this.bookingsSubject.next(bookings);
      });
  }

  /**
   * Génère un identifiant unique pour un nouvel utilisateur.
   * @returns Un identifiant numérique unique.
   */
  generateId(): number {
    const bookings = BOOKINGS;
    const id = this.memory.bookingId(bookings);
    return id;
  }

  /**
   * Gère les erreurs de requête HTTP.
   * @param operation - Le nom de l'opération pendant laquelle l'erreur s'est produite.
   * @param result - La valeur de retour en cas d'erreur.
   * @returns Un Observable du résultat.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: unknown): Observable<T> => {
      console.error(`${operation} failed: ${error}`);
      return of(result as T);
    };
  }
}
