import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '@/app/user/domain/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @Input() users: User[] = [];
  @Output() add = new EventEmitter<User>();
  @Output() update = new EventEmitter<User>();
  @Output() delete = new EventEmitter<User>();

  displayedColumns: string[] = ['id', 'name', 'email', 'action'];

  createUser(): User {
    return {
      id: 4,
      userName: 'f.torres',
      firstName: 'Torres',
      lastName: 'Ferran',
      email: 'ftorres@gmail.com',
      password: '$2y$10$e4BFLbsxsLoG2OYvzcTL7.cbFbxxPT00MMqLke7aLwpRvjlPQgzVm',
    };
  }

  onAdd() {
    const user = this.createUser();
    this.add.emit(user);
  }

  onUpdate(user: User) {
    this.update.emit(user);
  }

  onDelete(user: User) {
    this.delete.emit(user);
  }
}
