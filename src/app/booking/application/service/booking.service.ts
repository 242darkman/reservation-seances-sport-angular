import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '@/app/auth/application/services/auth.service';
import { BOOKINGS } from '@/app/booking/mock/mock-booking';
import { Booking } from '@/app/booking/domain/booking';
import { InMemoryDataService } from '@/app/in-memory-data.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import get from 'lodash/get';

/**
 * @description Service pour la gestion des réservations.
 * Ce service fournit plusieurs méthodes pour obtenir des informations sur les réservations.
 *
 * @example
 * this.bookingService.getBookings();
 *
 * @injectable
 */
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

  /**
   * @description Getter pour obtenir le BehaviorSubject en tant qu'Observable
   *
   * @returns Un Observable des réservations.
   */
  get bookingAsObservable(): Observable<Booking[]> {
    return this.bookingsSubject.asObservable();
  }

  /**
   * @description Getter pour obtenir la valeur actuelle du BehaviorSubject.
   *
   * @returns La valeur actuelle du BehaviorSubject.
   */
  get findBookings(): Booking[] {
    return this.bookingsSubject.getValue();
  }

  /**
   * @description Setter pour mettre à jour les réservations.
   *
   * @param booking Les nouvelles réservations.
   */
  set setBooking(booking: Booking[]) {
    this.bookingsSubject.next(booking);
  }

  /**
   * @description Insère une nouvelle réservation.
   *
   * @param booking La nouvelle réservation.
   * @returns Un Observable de la nouvelle réservation.
   */
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
   * @description Met à jour une réservation existante.
   *
   * @param booking La réservation à mettre à jour.
   * @param callback La fonction à exécuter après la mise à jour.
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
   * @description Supprime une réservation.
   *
   * @param id L'identifiant de la réservation à supprimer.
   * @param callback La fonction à exécuter après la suppression.
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

  /**
   * @description Réserve une session.
   *
   * @param booking La réservation de la session.
   * @returns Une Promesse de la nouvelle réservation.
   */
  async bookSession(booking: Booking): Promise<Booking> {
    return new Promise((resolve, reject) => {
      this.insertBooking(booking).subscribe(
        newBooking => {
          console.log(this.findBookings);
          resolve(newBooking);
        },
        error => {
          console.error('Error:', error);
          reject(error);
        }
      );
    });
  }

  /**
   * @description Obtient toutes les réservations.
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
   * @description Obtient les réservations d'un utilisateur.
   *
   * @param id L'identifiant de l'utilisateur.
   */
  getBookingsByUserId(userId: number): void {
    const url = `${this.bookingUrl}/?userId=${userId}`;
    this.http
      .get<Booking[]>(url)
      .pipe(
        tap(),
        catchError(
          this.handleError<Booking[]>(`getBookingsByUserId id=${userId}`, [])
        )
      )
      .subscribe(bookings => {
        this.bookingsSubject.next(bookings);
      });
  }

  /**
   * @description Génère un identifiant unique pour une nouvelle réservation.
   *
   * @returns Un identifiant numérique unique.
   */
  generateId(): number {
    const bookings = BOOKINGS;
    const id = this.memory.bookingId(bookings);
    return id;
  }

  /**
   * @description Gère les erreurs de requête HTTP.
   *
   * @param operation Le nom de l'opération pendant laquelle l'erreur s'est produite.
   * @param result La valeur de retour en cas d'erreur.
   * @returns Un Observable du résultat.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: unknown): Observable<T> => {
      console.error(`${operation} failed: ${error}`);
      return of(result as T);
    };
  }
}
