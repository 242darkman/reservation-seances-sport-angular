import { OpeningHour } from '@/app/session/domain/session';

export interface Booking {
  id?: number;
  userId: number;
  sessionId: number;
  timeBook: OpeningHour[];
}
