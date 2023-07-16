import {Injectable} from '@angular/core';
import {Session, TrainingSession, TrainingSessionImages} from "@/app/session/domain/session";
import {sessionsMock} from "@/app/session/mock/mock-session";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessions: Session[] = sessionsMock;

  constructor() { }

  getAllSessions(): Session[] {
    return this.sessions;
  }

  getSessionById(id: number): Session {
    const session = this.sessions.find(session => session.id === id);

    return session ?? [] as unknown as Session;
  }

  getTrainingSessionImageUrl(type: string): string {
    return TrainingSessionImages[this.getKeyByValue(TrainingSession, type) as keyof  typeof TrainingSession];
  }

  getKeyByValue(obj: { [key: string]: string }, value: string): string | undefined {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === value) {
        return key;
      }
    }
    return undefined;
  }
}
