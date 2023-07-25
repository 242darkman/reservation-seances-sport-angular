import { Component, Input } from '@angular/core';

import { User } from '@/app/user/domain/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @Input() users: User[] = [];

  displayedColumns: string[] = ['id', 'name', 'email', 'action'];
}
