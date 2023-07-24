import { Session, TrainingSession } from '@/app/session/domain/session';

export const sessionsMock: Session[] = [
  {
    id: 1,
    title: 'Session de course',
    description: "Entraînement de course à pied pour améliorer l'endurance",
    imageUrl: '',
    type: TrainingSession.CARDIO,
    openingHours: [
      { dayOfWeek: 'Lundi', startTime: '09:00', endTime: '11:00' },
      { dayOfWeek: 'Mercredi', startTime: '14:00', endTime: '16:00' },
    ],
  },
  {
    id: 2,
    title: 'Session de musculation',
    description: 'Entraînement de renforcement musculaire pour gagner en force',
    imageUrl: '',
    type: TrainingSession.STRENGTH,
    openingHours: [
      { dayOfWeek: 'Mardi', startTime: '10:00', endTime: '12:00' },
      { dayOfWeek: 'Jeudi', startTime: '16:00', endTime: '18:00' },
    ],
  },
  {
    id: 3,
    title: 'Entraînement en groupe de danse',
    description: "Session de danse rythmée en groupe pour se dépenser en s'amusant",
    imageUrl: '',
    type: TrainingSession.GROUP,
    openingHours: [
      { dayOfWeek: 'Mardi', startTime: '18:30', endTime: '20:00' },
      { dayOfWeek: 'Vendredi', startTime: '19:00', endTime: '20:30' },
    ],
  },
  {
    id: 4,
    title: 'Session de yoga',
    description: 'Séance de yoga pour améliorer la flexibilité et la relaxation',
    imageUrl: '',
    type: TrainingSession.YOGA,
    openingHours: [
      { dayOfWeek: 'Lundi', startTime: '10:00', endTime: '11:30' },
      { dayOfWeek: 'Mercredi', startTime: '09:00', endTime: '10:30' },
    ],
  },
  {
    id: 5,
    title: 'Entraînement fonctionnel',
    description: "Session d'exercices fonctionnels pour renforcer le corps entier",
    imageUrl: '',
    type: TrainingSession.FUNCTIONAL,
    openingHours: [
      { dayOfWeek: 'Mardi', startTime: '15:30', endTime: '17:00' },
      { dayOfWeek: 'Jeudi', startTime: '14:00', endTime: '15:30' },
    ],
  },
  {
    id: 6,
    title: 'Entraînement en plein air',
    description: 'Randonnée en plein air pour combiner exercice et nature',
    imageUrl: '',
    type: TrainingSession.OUTDOOR,
    openingHours: [
      { dayOfWeek: 'Samedi', startTime: '08:00', endTime: '12:00' },
      { dayOfWeek: 'Dimanche', startTime: '10:00', endTime: '20:00' },
    ],
  },
  {
    id: 7,
    title: 'Session de boxe',
    description: 'Entraînement de boxe pour améliorer la coordination et la force',
    imageUrl: '',
    type: TrainingSession.GROUP,
    openingHours: [
      { dayOfWeek: 'Lundi', startTime: '19:00', endTime: '20:30' },
      { dayOfWeek: 'Mercredi', startTime: '18:30', endTime: '20:00' },
    ],
  },
  {
    id: 8,
    title: 'Session de stretching',
    description: 'Séance de stretching pour améliorer la souplesse et la mobilité',
    imageUrl: '',
    type: TrainingSession.YOGA,
    openingHours: [
      { dayOfWeek: 'Jeudi', startTime: '17:00', endTime: '18:00' },
      { dayOfWeek: 'Vendredi', startTime: '10:00', endTime: '11:00' },
    ],
  },
];
