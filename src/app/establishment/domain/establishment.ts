import { OpeningHour } from '@/app/session/domain/session';

export interface Establishment {
  nom: string;
  address: string;
  imgUrl: string;
  phoneNumber: string;
  openingHours: Pick<OpeningHour, 'startTime' | 'endTime' | 'dayOfWeek'>[];
  id: number;
}
