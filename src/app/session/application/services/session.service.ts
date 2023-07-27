import { BehaviorSubject, Observable } from 'rxjs';
import {
  OpeningHour,
  Session,
  TrainingSession,
  TrainingSessionImages,
} from '@/app/session/domain/session';

import { ESTABLISHMENTS } from '@/app/establishment/mock/mock-establishment';
import { Establishment } from '@/app/establishment/domain/establishment';
import { Injectable } from '@angular/core';
import { sessionsMock } from '@/app/session/mock/mock-session';

export interface sessionByEstablishment {
  nomEstablishment: string;
  establishmentId: number;
  address: string;
  sessions: Session[];
}
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private sessions: Session[] = sessionsMock;
  private establishments: Establishment[] = ESTABLISHMENTS;

  private sessionsSubject: BehaviorSubject<Session[]> = new BehaviorSubject<
    Session[]
  >(this.sessions);

  get sessionsAsObservable(): Observable<Session[]> {
    return this.sessionsSubject.asObservable();
  }

  get sessionsAsValue(): Session[] {
    return this.sessionsSubject.value;
  }
  set updateSessions(session: Session[]) {
    this.sessionsSubject.next(session);
  }

  updateSession(updatedSession: Session): Session[] {
    const index = this.sessionsAsValue.findIndex(
      session => session.id === updatedSession.id
    );
    if (index !== -1) {
      this.sessionsAsValue[index] = updatedSession;
    }
    return this.sessionsAsValue;
  }
  getSessionById(id: number): Session {
    const sessionData = this.sessions.find(session => session.id === id);

    return sessionData ?? ([] as unknown as Session);
  }

  getSessionByEstablishment(): sessionByEstablishment[] {
    const sessionsByEstablishment: Map<number, Session[]> = new Map();

    for (const session of this.sessions) {
      if (session.establishmentId) {
        if (sessionsByEstablishment.has(session.establishmentId)) {
          sessionsByEstablishment.get(session.establishmentId)?.push(session);
        } else {
          sessionsByEstablishment.set(session.establishmentId, [session]);
        }
      }
    }

    const result: sessionByEstablishment[] = [];

    for (const [establishmentId, sessions] of sessionsByEstablishment) {
      const establishment = this.establishments.find(
        e => e.id === establishmentId
      );
      if (establishment) {
        result.push({
          establishmentId: establishment.id,
          nomEstablishment: establishment.nom,
          address: establishment.address,
          sessions,
        });
      }
    }

    return result;
  }

  getOneSessionByEstablishment(id: number): sessionByEstablishment {
    return this.getSessionByEstablishment().find(
      sessionByEstablishment => sessionByEstablishment.establishmentId === id
    ) as sessionByEstablishment;
  }

  getTrainingSessionImageUrl(type: string): string {
    return TrainingSessionImages[
      this.getKeyByValue(TrainingSession, type) as keyof typeof TrainingSession
    ];
  }

  getKeyByValue(
    obj: { [key: string]: string },
    value: string
  ): string | undefined {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === value) {
        return key;
      }
    }
    return undefined;
  }

  validOpenings(openingsHour: OpeningHour[]): OpeningHour[] {
    const date = new Date();
    return openingsHour.filter(
      openingHour =>
        new Date(openingHour.fullDate) > date &&
        new Date().getTime().toLocaleString() < openingHour.endTime
    );
  }
}
