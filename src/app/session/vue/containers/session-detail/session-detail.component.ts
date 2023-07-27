import { Component, OnInit } from '@angular/core';
import { OpeningHour, Session } from '@/app/session/domain/session';

import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'session-detail',
  templateUrl: 'session-detail.component.html',
  styleUrls: ['session-detail.component.scss'],
})
export class SessionDetailComponent implements OnInit {
  session!: Session;
  sessionId!: number;
  selectedDays!: OpeningHour[];
  booking$ = this.bookingService.booking$;
  allSessions: Session[] = [];
  userBookings: Booking[] = [];

  constructor(
    private route: ActivatedRoute,
    public sessionService: SessionService,
    private bookingService: BookingFacadeService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id: string = get(param, 'id');
      this.sessionId = parseInt(id);
      this.session = this.sessionService.getSessionById(this.sessionId);
      this.sessionService.sessionsAsObservable.subscribe(
        sessions => (this.allSessions = sessions)
      );
    });

    this.selectedDays = [this.session.openingHours[0]];
  }

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
}
