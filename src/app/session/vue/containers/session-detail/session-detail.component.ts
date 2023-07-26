import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpeningHour, Session } from '@/app/session/domain/session';
import { SessionService } from '@/app/session/application/services/session.service';
import get from 'lodash/get';
import parseInt from 'lodash/parseInt';
import { BookingService } from '@/app/booking/application/service/booking.service';
import { Booking } from '@/app/booking/domain/booking';
import { AuthService } from '@/app/auth/application/services/auth.service';
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
  constructor(
    private route: ActivatedRoute,
    public sessionService: SessionService,
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id: string = get(param, 'id');
      this.sessionId = parseInt(id);
      this.session = this.sessionService.getSessionById(this.sessionId);
    });

    this.selectedDays = [this.session.openingHours[0]];
  }

  onReserve() {
    return;
  }

  onBooking() {
    const book: Booking = {
      timeBook: this.selectedDays,
      sessionId: this.sessionId,
      userId: this.authService.getUser()?.id as number,
    };

    this.bookingService
      .bookingSession(book)
      .then(reservation => {
        this.sessionService.sessionsAsObservable
          .pipe(take(1))
          .subscribe(sessions => {
            const sessionBooking = sessions.find(
              session => session.id === this.sessionId
            );
            if (sessionBooking) {
              sessionBooking.openingHours.forEach(sessionTime => {
                if (book.timeBook.includes(sessionTime)) {
                  sessionTime.availablePlace--;
                  console.log(reservation);
                }
              });
              this.sessionService.updateSession(sessionBooking);
            }
          });
      })
      .catch(error => {
        console.error('Erreur lors de la réservation :', error);
      });
  }
}
