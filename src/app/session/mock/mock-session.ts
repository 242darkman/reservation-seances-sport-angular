import { Session, TrainingSession } from '@/app/session/domain/session';

export const sessionsMock: Session[] = [
  {
    id: 1,
    establishmentId: 1,
    title: 'Session de Cardio',
    description: 'Entraînement cardiovasculaire intensif',
    type: TrainingSession.CARDIO,
    openingHours: [
      {
        dayOfWeek: 'Lundi',
        startTime: '09:00',
        endTime: '10:30',
        fullDate: new Date(2023, 6, 17, 9, 0).getTime(),
      },
      {
        dayOfWeek: 'Mercredi',
        startTime: '14:00',
        endTime: '15:30',
        fullDate: new Date(2023, 6, 19, 14, 0).getTime(),
      },
    ],
  },
  {
    id: 2,
    establishmentId: 2,
    title: 'Séance de Yoga',
    description: 'Yoga pour se détendre et se ressourcer',
    type: TrainingSession.YOGA,
    openingHours: [
      {
        dayOfWeek: 'Mardi',
        startTime: '17:00',
        endTime: '18:30',
        fullDate: new Date(2023, 6, 18, 17, 0).getTime(),
      },
      {
        dayOfWeek: 'Vendredi',
        startTime: '10:00',
        endTime: '11:30',
        fullDate: new Date(2023, 6, 21, 10, 0).getTime(),
      },
    ],
  },
  {
    id: 3,
    establishmentId: 3,
    title: 'Séance de Strength',
    description: 'Entraînement musculaire intense',
    type: TrainingSession.STRENGTH,
    openingHours: [
      {
        dayOfWeek: 'Jeudi',
        startTime: '18:00',
        endTime: '19:30',
        fullDate: new Date(2023, 6, 20, 18, 0).getTime(),
      },
      {
        dayOfWeek: 'Samedi',
        startTime: '09:30',
        endTime: '11:00',
        fullDate: new Date(2023, 6, 22, 9, 30).getTime(),
      },
    ],
  },
  {
    id: 4,
    establishmentId: 2,
    title: 'Séance de Group',
    description: 'Entraînement en groupe convivial',
    type: TrainingSession.GROUP,
    openingHours: [
      {
        dayOfWeek: 'Mardi',
        startTime: '10:00',
        endTime: '11:30',
        fullDate: new Date(2023, 6, 18, 10, 0).getTime(),
      },
      {
        dayOfWeek: 'Jeudi',
        startTime: '16:00',
        endTime: '17:30',
        fullDate: new Date(2023, 6, 20, 16, 0).getTime(),
      },
    ],
  },
  {
    id: 5,
    establishmentId: 5,
    title: 'Séance de Functional',
    description: 'Entraînement fonctionnel pour tous niveaux',
    type: TrainingSession.FUNCTIONAL,
    openingHours: [
      {
        dayOfWeek: 'Lundi',
        startTime: '17:00',
        endTime: '18:30',
        fullDate: new Date(2023, 6, 17, 17, 0).getTime(),
      },
      {
        dayOfWeek: 'Mercredi',
        startTime: '08:30',
        endTime: '10:00',
        fullDate: new Date(2023, 6, 19, 8, 30).getTime(),
      },
    ],
  },
  {
    id: 6,
    establishmentId: 4,
    title: 'Séance de Outdoor',
    description: 'Entraînement en plein air dans la nature',
    type: TrainingSession.OUTDOOR,
    openingHours: [
      {
        dayOfWeek: 'Vendredi',
        startTime: '15:00',
        endTime: '16:30',
        fullDate: new Date(2023, 6, 21, 15, 0).getTime(),
      },
      {
        dayOfWeek: 'Dimanche',
        startTime: '11:00',
        endTime: '12:30',
        fullDate: new Date(2023, 6, 23, 11, 0).getTime(),
      },
    ],
  },
  {
    id: 7,
    establishmentId: 7,
    title: 'Séance de Yoga',
    description: 'Yoga pour se détendre et se ressourcer',
    type: TrainingSession.YOGA,
    openingHours: [
      {
        dayOfWeek: 'Lundi',
        startTime: '08:00',
        endTime: '09:30',
        fullDate: new Date(2023, 6, 17, 8, 0).getTime(),
      },
      {
        dayOfWeek: 'Mercredi',
        startTime: '17:30',
        endTime: '19:00',
        fullDate: new Date(2023, 6, 19, 17, 30).getTime(),
      },
    ],
  },
  {
    id: 8,
    establishmentId: 8,
    title: 'Séance de Cardio',
    description: 'Entraînement cardiovasculaire intensif',
    type: TrainingSession.CARDIO,
    openingHours: [
      {
        dayOfWeek: 'Mardi',
        startTime: '15:00',
        endTime: '16:30',
        fullDate: new Date(2023, 6, 18, 15, 0).getTime(),
      },
      {
        dayOfWeek: 'Jeudi',
        startTime: '09:30',
        endTime: '11:00',
        fullDate: new Date(2023, 6, 20, 9, 30).getTime(),
      },
    ],
  },
  {
    id: 9,
    establishmentId: 9,
    title: 'Séance de Strength',
    description: 'Entraînement musculaire intense',
    type: TrainingSession.STRENGTH,
    openingHours: [
      {
        dayOfWeek: 'Lundi',
        startTime: '18:00',
        endTime: '19:30',
        fullDate: new Date(2023, 6, 17, 18, 0).getTime(),
      },
      {
        dayOfWeek: 'Mercredi',
        startTime: '09:00',
        endTime: '10:30',
        fullDate: new Date(2023, 6, 19, 9, 0).getTime(),
      },
    ],
  },
  {
    id: 10,
    establishmentId: 1,
    title: 'Séance de Group',
    description: 'Entraînement en groupe convivial',
    type: TrainingSession.GROUP,
    openingHours: [
      {
        dayOfWeek: 'Vendredi',
        startTime: '16:00',
        endTime: '17:30',
        fullDate: new Date(2023, 6, 21, 16, 0).getTime(),
      },
      {
        dayOfWeek: 'Samedi',
        startTime: '10:00',
        endTime: '11:30',
        fullDate: new Date(2023, 6, 22, 10, 0).getTime(),
      },
    ],
  },
];
