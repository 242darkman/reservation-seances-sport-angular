import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpeningHour, Session } from '@/app/session/domain/session';

import { AuthService } from '@/app/auth/application/services/auth.service';
import { Booking } from '@/app/booking/domain/booking';
import { BookingFacadeService } from '@/app/booking/application/facade/booking-facade.service';
import { SessionService } from '@/app/session/application/services/session.service';
import { ToastrService } from 'ngx-toastr';
import { find } from 'lodash';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import parseInt from 'lodash/parseInt';
import { take } from 'rxjs';

/**
 * @description Le composant SessionDetailComponent affiche les détails d'une session spécifique.
 * L'utilisateur peut réserver une session à partir de cette page.
 * Le composant met à jour le nombre de places disponibles après chaque réservation.
 *
 * @example
 * <session-detail></session-detail>
 *
 * @selector session-detail
 */
@Component({
  selector: 'session-detail',
  templateUrl: 'session-detail.component.html',
  styleUrls: ['session-detail.component.scss'],
})
export class SessionDetailComponent implements OnInit {
  /**
   * La session en cours de consultation.
   */
  session!: Session;
  /**
   * L'identifiant de la session en cours de consultation.
   */
  sessionId!: number;
  /**
   * Les jours sélectionnés pour la réservation.
   */
  selectedDays!: OpeningHour[];
  /**
   * Un flux d'informations de réservation.
   */
  booking$ = this.bookingService.booking$;
  /**
   * Toutes les sessions disponibles.
   */
  allSessions: Session[] = [];
  /**
   * Les réservations effectuées par l'utilisateur.
   */
  userBookings: Booking[] = [];

  constructor(
    private route: ActivatedRoute,
    public sessionService: SessionService,
    private bookingService: BookingFacadeService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  /**
   * Méthode ngOnInit, récupère les informations de la session à partir de l'identifiant.
   */
  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id: string = get(param, 'id');
      this.sessionId = parseInt(id);
      this.session = this.sessionService.getSessionById(this.sessionId);

      this.session.openingHours = this.sessionService.validOpenings(
        this.session.openingHours
      );

      this.sessionService.sessionsAsObservable.subscribe(
        sessions => (this.allSessions = sessions)
      );
    });

    this.selectedDays = [this.session.openingHours[0]];
  }

  /**
   * Diminue la disponibilité d'une session.
   *
   * @param sessionId L'identifiant de la session à réserver.
   * @param bookedTime Le créneau horaire réservé.
   */
  decreaseAvailability(sessionId: number, bookedTime: any) {
    const sessionToBook = find(this.allSessions, session =>
      isEqual(session.id, sessionId)
    );
    if (sessionToBook) {
      const timeSlot = sessionToBook.openingHours.find(time =>
        isEqual(time, bookedTime)
      );
      if (timeSlot && timeSlot.availablePlace > 0) {
        timeSlot.availablePlace--;
      }
    }
  }

  /**
   * Vérifie si l'utilisateur a déjà réservé la session.
   *
   * @param userId L'identifiant de l'utilisateur.
   * @param sessionId L'identifiant de la session.
   * @param bookedTime Le créneau horaire réservé.
   * @returns Vrai si la session est déjà réservée, sinon faux.
   */
  alreadyBooked(userId: number, sessionId: number, bookedTime: any): boolean {
    this.booking$.subscribe(booking => {
      const bookings = booking.filter(b => b.userId === userId);

      if (!bookings.length) {
        return;
      }
      this.userBookings = bookings;
    });

    if (this.userBookings) {
      const sessionAlreadyBooked = this.userBookings.find(
        booking =>
          booking.sessionId === sessionId &&
          isEqual(booking.timeBook, bookedTime)
      );
      return sessionAlreadyBooked !== undefined;
    }
    return false;
  }

  /**
   * Gère la logique de réservation d'une session.
   */
  onBooking() {
    const user = this.authService.getUser();
    if (!user) {
      this.toastr.error(
        'Vous devez être connecté pour faire une réservation',
        'Erreur'
      );
      return;
    }

    const book: Booking = {
      timeBook: this.selectedDays,
      sessionId: this.sessionId,
      userId: user.id,
    };

    if (this.alreadyBooked(book.userId, book.sessionId, book.timeBook)) {
      this.toastr.error('Vous avez déjà réservé ce créneau', 'Erreur');
      return;
    }

    this.bookingService.insertBooking(book).subscribe(
      () => {
        this.sessionService.sessionsAsObservable
          .pipe(take(1))
          .subscribe(sessions => {
            const sessionBooking = sessions.find(
              session => session.id === this.sessionId
            );
            if (sessionBooking) {
              this.decreaseAvailability(book.sessionId, book.timeBook);
              this.sessionService.updateSession(sessionBooking);
              this.toastr.success('Réservation réussie!', 'Succès');
            }
          });
      },
      error => {
        console.error('Erreur lors de la réservation :', error);
        this.toastr.error('Erreur lors de la réservation', 'Erreur');
      }
    );
  }

  isValidOpening() {
    return (
      this.sessionService.validOpenings(this.session.openingHours).length > 0
    );
  }
}
