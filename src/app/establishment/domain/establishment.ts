import { OpeningHour } from '@/app/session/domain/session';

export interface Establishment {
  nom: string;
  address: string;
  opening: string;
  close: string;
  imgUrl: string;
  phoneNumber: string;
  openingHours: Pick<OpeningHour, 'startTime' | 'endTime' | 'dayOfWeek'>[];
  id: number;
}
