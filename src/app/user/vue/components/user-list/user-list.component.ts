import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  onAdd() {
    this.add.emit();
  }

  onUpdate(user: User) {
    this.update.emit(user);
  }

  onDelete(user: User) {
    this.delete.emit(user);
  }
}
