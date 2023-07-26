import { Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from '@/app/user/domain/user';

/**
 * Component UserListComponent
 *
 * Ce composant gère la liste des utilisateurs et les actions d'ajout, de mise à jour et de suppression des utilisateurs.
 * Les données sont fournies par un tableau d'utilisateurs en entrée et les actions sont propagées à l'aide de la sortie d'événements.
 *
 * @selector app-user-list
 * @input users Liste des utilisateurs à afficher dans le tableau. Les utilisateurs sont des objets de type User.
 * @output add Événement déclenché lorsqu'un utilisateur est ajouté.
 * @output update Événement déclenché lorsqu'un utilisateur est mis à jour.
 * @output delete Événement déclenché lorsqu'un utilisateur est supprimé.
 */
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

  /**
   * Méthode pour déclencher l'événement d'ajout d'utilisateur.
   */
  onAdd() {
    this.add.emit();
  }

  /**
   * Méthode pour déclencher l'événement de mise à jour d'utilisateur.
   * @param user Utilisateur à mettre à jour.
   */
  onUpdate(user: User) {
    this.update.emit(user);
  }

  /**
   * Méthode pour déclencher l'événement de suppression d'utilisateur.
   * @param user Utilisateur à supprimer.
   */
  onDelete(user: User) {
    this.delete.emit(user);
  }
}
