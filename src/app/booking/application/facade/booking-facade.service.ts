import { Booking } from '@/app/booking/domain/booking';
import { BookingService } from '@/app/booking/application/service/booking.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * @description Service de façade pour les réservations.
 * Ce service fournit une interface simplifiée pour interagir avec le BookingService.
 * Il permet d'obtenir des informations sur les réservations, d'insérer, de mettre à jour ou de supprimer une réservation.
 *
 * @example
 * this.bookingFacadeService.getBookings();
 *
 * @injectable
 */
@Injectable({
  providedIn: 'root',
})
export class BookingFacadeService {
  booking$ = this.bookingService.bookings$;

  constructor(private bookingService: BookingService) {}

  /**
   * @description Getter pour obtenir les réservations.
   *
   * @returns Les réservations actuelles.
   */
  get findBookings(): Booking[] {
    return this.bookingService.findBookings;
  }

  /**
   * @description Récupère toutes les réservations.
   */
  getBookings() {
    this.bookingService.getBookings();
  }

  /**
   * @description Récupère les réservations d'un utilisateur.
   *
   * @param id L'identifiant de l'utilisateur.
   */
  getBookingsByUserId(id: number) {
    return this.bookingService.getBookingsByUserId(id);
  }

  /**
   * @description Insère une nouvelle réservation.
   *
   * @param booking La nouvelle réservation.
   * @returns Un Observable de la nouvelle réservation.
   */
  insertBooking(booking: Booking): Observable<Booking> {
    return this.bookingService.insertBooking(booking);
  }

  /**
   * @description Met à jour une réservation existante.
   *
   * @param booking La réservation à mettre à jour.
   * @param callback La fonction à exécuter après la mise à jour.
   */
  updateBooking(booking: Booking, callback: (success: boolean) => void) {
    this.bookingService.updateBooking(booking, callback);
  }

  /**
   * @description Supprime une réservation.
   *
   * @param id L'identifiant de la réservation à supprimer.
   * @param callback La fonction à exécuter après la suppression.
   */
  deleteBooking(id: number, callback: (success: boolean) => void) {
    this.bookingService.deleteBooking(id, callback);
  }

  /**
   * @description Réserve une session.
   *
   * @param booking La réservation de la session.
   * @returns Une Promesse de la nouvelle réservation.
   */
  async bookSession(booking: Booking) {
    return await this.bookingService.bookSession(booking);
  }

  /**
   * @description Génère un identifiant unique pour une nouvelle réservation.
   *
   * @returns Un identifiant numérique unique.
   */
  generateId() {
    return this.bookingService.generateId();
  }
}
