import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '@/app/user/domain/user';
import { USERS } from '@/app/user/mock/mock-users';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = USERS;
    return { users };
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map((hero) => hero.id)) + 1 : 1;
  }
}
