import { Component, Input, OnInit } from '@angular/core';
import { Session } from '@/app/session/domain/session';
import { SessionService } from '@/app/session/application/services/sessionService';

@Component({
  selector: 'session',
  templateUrl: 'session.component.html',
  styleUrls: ['session.component.scss'],
})
export class SessionComponent implements OnInit {
  @Input() session: Session = {} as Session;

  constructor(public sessionService: SessionService) {}

  ngOnInit() {}

  isSessionOpen(session: Session): boolean {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.toLocaleString('fr-FR', { weekday: 'long' });
    const currentTime = currentDate.toLocaleTimeString('fr-FR', { hour: 'numeric', minute: 'numeric' });

    const openingHours = session.openingHours.find(
      (openingHour) => openingHour.dayOfWeek.toLowerCase() === currentDayOfWeek,
    );

    if (!openingHours) {
      return false; // Session non planifiée pour le jour actuel
    }

    return currentTime >= openingHours.startTime && currentTime <= openingHours.endTime;
  }
}
