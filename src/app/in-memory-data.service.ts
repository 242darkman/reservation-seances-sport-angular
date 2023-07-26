import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '@/app/user/domain/user';
import { USERS } from '@/app/user/mock/mock-users';
import { Booking } from './booking/domain/booking';
import { ESTABLISHMENTS } from './establishment/mock/mock-establishment';

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

  bookingId(booking: Booking[]): number {
    return booking.length > 0
      ? Math.max(...booking.map(hero => hero.id as number)) + 1
      : 1;
  }
}
