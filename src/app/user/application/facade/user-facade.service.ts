import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@/app/user/domain/user';
import { UserService } from '@/app/user/application/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserFacadeService {
  users$ = this.userService.users$;

  constructor(private userService: UserService) {}

  getUsers() {
    this.userService.getUsers();
  }

  getUser(id: number) {
    return this.userService.getUser(id);
  }

  addUser(user: User): Observable<User> {
    return this.userService.addUser(user);
  }

  updateUser(user: User, callback: (success: boolean) => void) {
    this.userService.updateUser(user, callback);
  }

  deleteUser(id: number, callback: (success: boolean) => void) {
    this.userService.deleteUser(id, callback);
  }

  generateId() {
    return this.userService.generateId();
  }
}
