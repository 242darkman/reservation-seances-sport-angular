import { Component, OnInit } from '@angular/core';

import { User } from '@/app/user/domain/user';
import { UserFacadeService } from '@/app/user/application/facade/user-facade.service';
import get from 'lodash/get';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit {
  users$ = this.userFacade.users$;

  constructor(private userFacade: UserFacadeService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userFacade.getUsers();
  }

  addUser(user: User) {
    if (!user) {
      return;
    }
    this.userFacade.addUser(user);
  }

  updateUser(user: User) {
    this.userFacade.updateUser(user, (success: boolean) => {
      if (success) {
        console.log(`User with id ${user.id} updated successfully`);
        this.getUsers();
      } else {
        console.log(`Failed to update user with id ${user.id}`);
      }
    });
  }

  deleteUser(user: User) {
    const id: number = get(user, 'id');
    this.userFacade.deleteUser(id, (success: boolean) => {
      if (success) {
        console.log(`User with id ${id} deleted successfully`);
        this.getUsers();
      } else {
        console.log(`Failed to delete user with id ${id}`);
      }
    });
  }
}
