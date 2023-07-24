import {Component, OnInit} from "@angular/core";
import {sessionsMock} from "@/app/session/mock/mock-session";
import {Session} from "@/app/session/domain/session";
import {sessionByEstablishment, SessionService} from "@/app/session/application/services/session-service";

@Component({
  selector: 'session-listing',
  templateUrl: 'session-listing-page.component.html',
  styleUrls: ['session-listing-page.component.scss']
})
export class SessionListingPageComponent implements OnInit {
  sessions = sessionsMock;
  sessionsByEstablishment!: Array<sessionByEstablishment>;

  constructor(private sessionService: SessionService) {
  }

  ngOnInit() {
    this.sessionsByEstablishment = this.sessionService.getSessionByEstablishment();
  }

  onFilterChange(event: { type: string; title: string; date: Date }) {
    const { type, title, date } = event;

    this.sessions = this.sessions.filter((session) => {
      const isTypeMatch = !type || session.type.toLowerCase().includes(type.toLowerCase());
      const isTitleMatch = !title || session.title.toLowerCase().includes(title.toLowerCase());

      const isOpenOnDate = !date || this.isSessionOpenOnDate(session, date);

      return isTypeMatch && isTitleMatch && isOpenOnDate;
    });

  }

  isSessionOpenOnDate(session: Session, date: Date): boolean {
    const currentDayOfWeek = date.toLocaleString('fr-FR', { weekday: 'long' });
    const currentTime = date.toLocaleTimeString('fr-FR', { hour: 'numeric', minute: 'numeric' });

    const openingHours = session.openingHours.find((openingHour) => openingHour.dayOfWeek.toLowerCase() === currentDayOfWeek)

    if (!openingHours) {
      return false; // Session non planifiée pour le jour actuel
    }

    return currentTime >= openingHours.startTime && currentTime <= openingHours.endTime;
  }
}
