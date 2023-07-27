import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@/app/user/domain/user';
import { UserService } from '@/app/user/application/services/user.service';

/**
 * Service UserFacadeService
 *
 * Ce service agit comme une façade pour UserService.
 * Il offre des méthodes pour obtenir, ajouter, mettre à jour et supprimer des utilisateurs.
 * Il fournit également un observable pour un flux d'utilisateurs.
 *
 * @injectable providedIn: 'root'
 */
@Injectable({
  providedIn: 'root',
})
export class UserFacadeService {
  /**
   * Un observable de tableau des utilisateurs. Il est utilisé pour récupérer les utilisateurs de UserService.
   */
  users$ = this.userService.users$;

  constructor(private userService: UserService) {}

  /**
   * Récupère tous les utilisateurs via UserService.
   */
  getUsers() {
    this.userService.getUsers();
  }

  /**
   * Récupère un utilisateur spécifique via UserService.
   * @param id L'ID de l'utilisateur à récupérer.
   */
  getUser(userId: number) {
    return this.userService.getUser(userId);
  }

  /**
   * Ajoute un nouvel utilisateur via UserService.
   * @param user L'utilisateur à ajouter.
   * @return Observable<User> L'utilisateur ajouté.
   */
  addUser(user: User): Observable<User> {
    return this.userService.addUser(user);
  }

  /**
   * Met à jour un utilisateur existant via UserService.
   * @param user L'utilisateur à mettre à jour.
   * @param callback Le callback à exécuter après la mise à jour.
   */
  updateUser(user: User, callback: (success: boolean) => void) {
    this.userService.updateUser(user, callback);
  }

  /**
   * Supprime un utilisateur via UserService.
   * @param id L'ID de l'utilisateur à supprimer.
   * @param callback Le callback à exécuter après la suppression.
   */
  deleteUser(id: number, callback: (success: boolean) => void) {
    this.userService.deleteUser(id, callback);
  }

  /**
   * Génère un nouvel ID utilisateur via UserService.
   * @return number L'ID généré.
   */
  generateId() {
    return this.userService.generateId();
  }
}
