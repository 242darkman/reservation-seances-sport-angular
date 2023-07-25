import {
  Session,
  TrainingSession,
  TrainingSessionImages,
} from '@/app/session/domain/session';

import { Establishment } from '@/app/establishment/domain/establishment';
import { Injectable } from '@angular/core';
import { ESTABLISHMENTS } from '@/app/establishment/mock/mock-establishment';
import { sessionsMock } from '@/app/session/mock/mock-session';

export interface sessionByEstablishment {
  nomEstablishment: string;
  address: string;
  sessions: Session[];
}
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private sessions: Session[] = sessionsMock;
  private establishments: Establishment[] = ESTABLISHMENTS;

  getAllSessions(): Session[] {
    return this.sessions;
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
          nomEstablishment: establishment.nom,
          address: establishment.address,
          sessions,
        });
      }
    }

    return result;
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
