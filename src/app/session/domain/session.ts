/**
 * Interface décrivant une Session de formation.
 */
export interface Session {
  /** L'identifiant unique de la Session. */
  id: number;

  /** L'identifiant unique de l'établissement associé. */
  establishmentId?: number;

  /** Le titre de la Session. */
  title: string;

  /** La description de la Session. */
  description: string;

  /** L'URL de l'image associée à la Session. */
  imageUrl?: string;

  /** Le type de la Session, défini par l'énumération TrainingSession. */
  type: TrainingSession;

  /** Les heures d'ouverture pour cette Session. */
  openingHours: OpeningHour[];
}

/**
 * Interface décrivant les heures d'ouverture d'une Session.
 */
export interface OpeningHour {
  /** Le jour de la semaine. */
  dayOfWeek: string;

  /** L'heure de début. */
  startTime: string;

  /** L'heure de fin. */
  endTime: string;

  /** La date complète. */
  fullDate: number;

  /** Nombre de place*/
  availablePlace: number;
}

/**
 * Enumération des différents types de Sessions.
 */
export enum TrainingSession {
  /** Session d'entraînement cardiovasculaire. */
  CARDIO = 'Entraînement cardiovasculaire',

  /** Session d'entraînement en force. */
  STRENGTH = 'Entraînement en force',

  /** Session d'entraînement en groupe. */
  GROUP = 'Entraînement en groupe',

  /** Session de Yoga ou Pilates. */
  YOGA = 'Yoga ou Pilates',

  /** Session d'entraînement fonctionnel. */
  FUNCTIONAL = 'Entraînement fonctionnel',

  /** Session d'entraînement en plein air. */
  OUTDOOR = 'Entraînement en plein air',
}

/**
 * Objet contenant les chemins d'accès aux images pour chaque type de Session.
 */
export const TrainingSessionImages = {
  /** Chemin d'accès à l'image pour le cardio. */
  CARDIO: 'assets/pictures/cardio.jpeg',

  /** Chemin d'accès à l'image pour l'entraînement en force. */
  STRENGTH: 'assets/pictures/strength.jpeg',

  /** Chemin d'accès à l'image pour l'entraînement en groupe. */
  GROUP: 'assets/pictures/group.gif',

  /** Chemin d'accès à l'image pour le yoga. */
  YOGA: 'assets/pictures/yoga.jpeg',

  /** Chemin d'accès à l'image pour l'entraînement fonctionnel. */
  FUNCTIONAL: 'assets/pictures/functional.jpeg',

  /** Chemin d'accès à l'image pour l'entraînement en plein air. */
  OUTDOOR: 'assets/pictures/outdoor.jpg',
};
