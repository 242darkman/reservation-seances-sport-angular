import { Component, OnInit } from '@angular/core';

import { User } from '@/app/user/domain/user';
import { UserFacadeService } from '@/app/user/application/facade/user-facade.service';
import get from 'lodash/get';

/**
 * Component UsersPageComponent
 *
 * Ce composant gère la page des utilisateurs.
 * Il utilise UserFacadeService pour récupérer, ajouter, mettre à jour et supprimer des utilisateurs.
 *
 * @selector app-users-page
 */
@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit {
  /**
   * Un observable de tableau des utilisateurs. Il est utilisé pour récupérer les utilisateurs de UserFacadeService.
   */
  users$ = this.userFacade.users$;

  constructor(private userFacade: UserFacadeService) {}

  /**
   * Initialise le composant en appelant getUsers().
   */
  ngOnInit(): void {
    this.getUsers();
  }

  /**
   * Appelle la méthode getUsers() de UserFacadeService pour récupérer la liste des utilisateurs.
   */
  getUsers(): void {
    this.userFacade.getUsers();
  }

  /**
   * Appelle la méthode addUser() de UserFacadeService pour ajouter un nouvel utilisateur.
   * @param user L'utilisateur à ajouter.
   */
  addUser(user: User) {
    if (!user) {
      return;
    }
    this.userFacade.addUser(user);
  }

  /**
   * Appelle la méthode updateUser() de UserFacadeService pour mettre à jour un utilisateur existant.
   * @param user L'utilisateur à mettre à jour.
   */
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

  /**
   * Appelle la méthode deleteUser() de UserFacadeService pour supprimer un utilisateur.
   * @param user L'utilisateur à supprimer.
   */
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
