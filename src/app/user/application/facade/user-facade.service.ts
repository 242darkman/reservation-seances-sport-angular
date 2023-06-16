import { Injectable } from '@angular/core';
import { User } from '@/app/user/domain/user';
import { UserService } from '@/app/user/application/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserFacadeService {
  constructor(private userService: UserService) {}

  getUsers() {
    const users = this.userService.getUsers();
    return users;
  }

  getUser(id: number) {
    const user = this.userService.getUser(id);
    return user;
  }

  addUser(user: User) {
    return this.userService.addUser(user);
  }

  updateUser(user: User) {
    return this.userService.updateUser(user);
  }

  deleteUser(id: number) {
    return this.userService.deleteUser(id);
  }

  generateId() {
    return this.userService.generateId();
  }
}
