import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '@/app/user/domain/user';
import { USERS } from '@/app/user/mock/mock-users';
import { Booking } from './booking/domain/booking';
import { ESTABLISHMENTS } from './establishment/mock/mock-establishment';
import { Establishment } from './establishment/domain/establishment';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = USERS;
    const establishments = ESTABLISHMENTS;
    return { users, establishments };
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(hero => hero.id)) + 1 : 1;
  }

  bookingId(bookings: Booking[]): number {
    return bookings.length > 0
      ? Math.max(...bookings.map(hero => hero.id)) + 1
      : 1;
  }

  EstablishmentId(Establishments: Establishment[]): number {
    return Establishments.length > 0
      ? Math.max(...Establishments.map(hero => hero.id)) + 1
      : 1;
  }
}
