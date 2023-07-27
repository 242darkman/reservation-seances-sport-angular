import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  SessionService,
  sessionByEstablishment,
} from '@/app/session/application/services/session.service';

import { ActivatedRoute } from '@angular/router';
import { FilterPayload } from '@/app/session/vue/components/session-filter/session-filter.component';
import { Session } from '@/app/session/domain/session';
import get from 'lodash/get';
import parseInt from 'lodash/parseInt';
import { sessionsMock } from '@/app/session/mock/mock-session';

@Component({
  selector: 'session-listing',
  templateUrl: 'session-establishment-listing-page.component.html',
  styleUrls: ['session-establishment-listing-page.component.scss'],
})
export class SessionEstablishmentListingPageComponent implements OnInit {
  sessions = sessionsMock;
  sessionsByEstablishment!: sessionByEstablishment;
  allSessionsByEstablishment!: sessionByEstablishment[];

  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe(param => {
      const id: string = get(param, 'id');
      this.sessionsByEstablishment =
        this.sessionService.getOneSessionByEstablishment(parseInt(id));

      this.sessionService.sessionsAsObservable.subscribe(() => {
        this.sessionsByEstablishment =
          this.sessionService.getOneSessionByEstablishment(parseInt(id));
      });
    });
    this.allSessionsByEstablishment =
      this.sessionService.getSessionByEstablishment();
  }

  onFilterChange(event: FilterPayload) {
    const { type, title, date } = event;

    this.sessionsByEstablishment.sessions =
      this.sessionsByEstablishment.sessions.filter(session => {
        const isTypeMatch =
          !type || session.type.toLowerCase().includes(type.toLowerCase());
        const isTitleMatch =
          !title || session.title.toLowerCase().includes(title.toLowerCase());

        const isOpenOnDate =
          !date || this.isSessionOpenOnDate(session, new Date(date));

        return isTypeMatch && isTitleMatch && isOpenOnDate;
      });
    if (!this.sessionService.isFilter) {
      this.sessionService.getSessions();
    }
  }

  isSessionOpenOnDate(session: Session, date: Date): boolean {
    const currentDayOfWeek = date.toLocaleString('fr-FR', { weekday: 'long' });
    const currentTime = date.toLocaleTimeString('fr-FR', {
      hour: 'numeric',
      minute: 'numeric',
    });

    const openingHours = session.openingHours.find(
      openingHour => openingHour.dayOfWeek.toLowerCase() === currentDayOfWeek
    );

    if (!openingHours) {
      return false; // Session non planifiée pour le jour actuel
    }

    return (
      currentTime >= openingHours.startTime &&
      currentTime <= openingHours.endTime
    );
  }
}
