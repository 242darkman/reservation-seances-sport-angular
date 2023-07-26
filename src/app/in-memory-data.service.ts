import { Booking } from './booking/domain/booking';
import { ESTABLISHMENTS } from './establishment/mock/mock-establishment';
import { Establishment } from './establishment/domain/establishment';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { USERS } from '@/app/user/mock/mock-users';
import { User } from '@/app/user/domain/user';

/**
 * Service qui imite une interface d'API REST avec une base de données en mémoire.
 * Ce service est utilisé pour simuler une API lors du développement de l'application.
 *
 * @Injectable
 */
@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  /**
   * Crée et renvoie une base de données en mémoire.
   * @returns Un objet qui contient des collections d'utilisateurs et d'établissements.
   */
  createDb() {
    const users = USERS;
    const establishments = ESTABLISHMENTS;
    return { users, establishments };
  }

  /**
   * Génère un ID unique pour un nouvel utilisateur.
   * Si la collection d'utilisateurs est vide, renvoie 1.
   * Sinon, renvoie l'ID le plus élevé + 1.
   * @param users - La collection d'utilisateurs
   * @returns Le nouvel ID généré.
   */
  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(hero => hero.id)) + 1 : 1;
  }


  EstablishmentId(Establishments: Establishment[]): number {
    return Establishments.length > 0
      ? Math.max(...Establishments.map(hero => hero.id)) + 1
  /**
   * Génère un ID unique pour une nouvelle réservation.
   * Si la collection des réservations est vide, renvoie 1.
   * Sinon, renvoie l'ID le plus élevé + 1.
   * @param booking - La collection des réservations
   * @returns Le nouvel ID généré.
   */
  bookingId(booking: Booking[]): number {
    return booking.length > 0
      ? Math.max(...booking.map(hero => hero.id)) + 1
      : 1;
  }
}
