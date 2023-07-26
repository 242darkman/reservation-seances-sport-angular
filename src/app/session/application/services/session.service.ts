import {
  Session,
  TrainingSession,
  TrainingSessionImages,
} from '@/app/session/domain/session';

import { Establishment } from '@/app/establishment/domain/establishment';
import { Injectable, OnInit } from '@angular/core';
import { ESTABLISHMENTS } from '@/app/establishment/mock/mock-establishment';
import { sessionsMock } from '@/app/session/mock/mock-session';
import { BehaviorSubject } from 'rxjs';

export interface sessionByEstablishment {
  nomEstablishment: string;
  establishmentId: number;
  address: string;
  sessions: Session[];
}
@Injectable({
  providedIn: 'root',
})
export class SessionService implements OnInit {
  private sessions: Session[] = sessionsMock;
  private establishments: Establishment[] = ESTABLISHMENTS;

  private sessionsSubject: BehaviorSubject<Session[]> = new BehaviorSubject<
    Session[]
  >([]);

  ngOnInit() {
    this.updateSessions(this.sessions);
  }

  // Getter pour obtenir le BehaviorSubject en tant qu'Observable
  get sessions$() {
    return this.sessionsSubject.asObservable();
  }

  // Méthode pour mettre à jour les sessions
  updateSessions(sessions: Session[]) {
    this.sessionsSubject.next(sessions);
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
}
