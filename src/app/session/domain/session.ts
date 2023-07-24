

export interface Session {
  id: number;
  establishmentId?: number;
  title: string;
  description: string;
  imageUrl?: string;
  type: TrainingSession;
  openingHours: Array<OpeningHour>;
}

export interface OpeningHour {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  fullDate: number;
}

export enum TrainingSession {
  CARDIO = 'Entraînement cardiovasculaire',
  STRENGTH = 'Entraînement en force',
  GROUP = 'Entraînement en groupe',
  YOGA = 'Yoga ou Pilates',
  FUNCTIONAL = 'Entraînement fonctionnel',
  OUTDOOR = 'Entraînement en plein air'
}

export const TrainingSessionImages = {
  CARDIO: 'assets/pictures/cardio.jpeg',
  STRENGTH: 'assets/pictures/strength.jpeg',
  GROUP: 'assets/pictures/group.gif',
  YOGA: 'assets/pictures/yoga.jpeg',
  FUNCTIONAL: 'assets/pictures/functional.jpeg',
  OUTDOOR: 'assets/pictures/outdoor.jpg'
};
