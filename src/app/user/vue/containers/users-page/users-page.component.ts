import { Component, OnInit } from '@angular/core';

import { User } from '@/app/user/domain/user';
import { UserFacadeService } from '@/app/user/application/facade/user-facade.service';
import filter from 'lodash/filter';
import get from 'lodash/get';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit {
  users: User[] = [];

  constructor(private userFacade: UserFacadeService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userFacade.getUsers().subscribe((users: User[]) => {
      this.users = users;
      console.log(`All users => ${this.users}`);
    });
  }

  addUser(user: User) {
    if (!user) {
      return;
    }
    this.userFacade.addUser(user).subscribe();
  }

  updateUser(user: User) {
    this.userFacade.updateUser(user).subscribe();
  }

  deleteUser(user: User) {
    this.users = filter(this.users, (u: User) => u !== user);
    const id = get(user, 'id');
    this.userFacade.deleteUser(id).subscribe();
  }
}
