import {Component, OnInit} from '@angular/core';
import {SessionService} from "@/app/session/application/services/session.service";
import {Session} from "@/app/session/domain/session";
import {FilterPayload} from "@/app/session/vue/components/session-filter/session-filter.component";

@Component({
  selector: 'app-sessions-listing-all',
  templateUrl: './sessions-listing-all.component.html',
  styleUrls: ['./sessions-listing-all.component.scss']
})
export class SessionsListingAllComponent implements  OnInit{
  sessions!: Session[];
  constructor(private sessionService: SessionService) {
  }
  ngOnInit() {
    this.sessionService.getSessions()
    this.sessionService.sessionsAsObservable.subscribe(sessions => {
      this.sessions = sessions;
    })
  }

  onFilterChange(event: FilterPayload) {
    console.log(event);
    const { type, title, date } = event;

    this.sessions = this.sessions.filter(session => {
      const isTypeMatch =
        !type || session.type.toLowerCase().includes(type.toLowerCase());
      const isTitleMatch =
        !title || session.title.toLowerCase().includes(title.toLowerCase());

      const isOpenOnDate = !date || this.isSessionOpenOnDate(session, new Date(date));

      return isTypeMatch && isTitleMatch && isOpenOnDate;
    });
    if (!this.sessionService.isFilter) {
      this.sessionService.getSessions()
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
