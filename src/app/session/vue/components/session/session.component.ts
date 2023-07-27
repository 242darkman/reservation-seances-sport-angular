import { Component, Input } from '@angular/core';

import { Session } from '@/app/session/domain/session';
import { SessionService } from '@/app/session/application/services/session.service';

@Component({
  selector: 'session',
  templateUrl: 'session.component.html',
  styleUrls: ['session.component.scss'],
})
export class SessionComponent {
  @Input() session: Session = {} as Session;

  constructor(public sessionService: SessionService) {}

  isSessionOpen(session: Session): boolean {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const currentTime = currentDate.toLocaleTimeString('fr-FR', {
      hour: 'numeric',
      minute: 'numeric',
    });

    const openingHours = session.openingHours.find(
      openingHour => new Date(openingHour.fullDate).getDay() === currentDay
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
