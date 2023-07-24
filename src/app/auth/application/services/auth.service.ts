import { EventEmitter, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { USERS } from '@/app/user/mock/mock-users';
import { User } from '@/app/user/domain/user';
import { UserFacadeService } from '@/app/user/application/facade/user-facade.service';
import find from 'lodash/find';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
/**
 * Classe de service d'authentification qui contient toutes les méthodes liées à l'authentification de l'utilisateur.
 */
export class AuthService {
  private isAuthenticatedEmitter = new EventEmitter<boolean>();

  isAuthenticated = this.isAuthenticatedEmitter.asObservable();
  isCurrentlyAuthenticated = false;

  constructor(
    private http: HttpClient,
    private userService: UserFacadeService
  ) {
    const token = this.getToken();
    if (!isEmpty(token)) {
      const loggedUserId = this.getUserIdFromToken(token);
      this.userService.getUser(loggedUserId).subscribe(user => {
        this.isCurrentlyAuthenticated = !!user;
        this.isAuthenticatedEmitter.emit(this.isCurrentlyAuthenticated);
      });
    }
  }

  /**
   * Défini l'utilisateur courant
   *
   * @param {User | null | undefined} user - L'utilisateur à définir comme utilisateur courant
   */
  setCurrentUser(user: User | null | undefined) {
    this.isCurrentlyAuthenticated = !!user;
    this.isAuthenticatedEmitter.emit(this.isCurrentlyAuthenticated);
  }

  /**
   * Authentifie un utilisateur
   *
   * @param {string} userName - Le nom d'utilisateur à utiliser pour la connexion
   * @returns {Observable<User>} L'utilisateur connecté
   */
  login(userName: string): Observable<User> {
    const apiLoginUrl = 'api/users';
    return this.http.get<User>(`${apiLoginUrl}/?userName=${userName}`).pipe(
      map(user => {
        this.isCurrentlyAuthenticated = !!user;
        this.isAuthenticatedEmitter.emit(this.isCurrentlyAuthenticated);
        return user;
      })
    );
  }

  /**
   * Déconnecte l'utilisateur actuellement connecté
   */
  logout() {
    localStorage.removeItem('app_token');
    this.isCurrentlyAuthenticated = false;
    this.isAuthenticatedEmitter.emit(this.isCurrentlyAuthenticated);
  }

  /**
   * Génère un token pour un utilisateur
   *
   * @param {User} user - L'utilisateur pour lequel générer le token
   * @returns {string} Le token généré
   */
  generateToken(user: User): string {
    const expire = Math.floor(Date.now() / 1000) + 60 * 60;
    const userInfo = { ...user, expire };
    const stringifyUser = JSON.stringify(userInfo);
    const encodeUser = btoa(stringifyUser);
    return encodeUser;
  }

  /**
   * Vérifie la validité d'un token
   *
   * @param {string} token - Le token à vérifier
   * @returns {boolean} La validité du token
   */
  verifyToken(token: string): boolean {
    const decodeUser = atob(token);
    const parsedUser = JSON.parse(decodeUser);
    const currentTime = Math.floor(Date.now() / 1000);
    const tokenExpiration = get(parsedUser, 'expire');
    return currentTime < tokenExpiration;
  }

  /**
   * Récupère l'ID de l'utilisateur à partir du token
   *
   * @param {string} token - Le token à utiliser pour récupérer l'ID
   * @returns {number} L'ID de l'utilisateur
   */
  getUserIdFromToken(token: string): number {
    const decodeToken = atob(token);
    const user = JSON.parse(decodeToken);
    const userId = get(user, 'id');
    return userId;
  }

  /**
   * Récupère le token actuel
   *
   * @returns {string} Le token actuel
   */
  getToken(): string {
    const token = localStorage.getItem('app_token');
    if (isNull(token) || isUndefined(token) || isEmpty(token)) {
      return '';
    }

    return token;
  }

  /**
   * Récupère l'utilisateur actuel
   *
   * @returns {User | undefined} L'utilisateur actuel
   */
  getUser(): User | undefined {
    const token = this.getToken();
    if (isEmpty(token)) {
      return;
    }
    const id = this.getUserIdFromToken(token);
    const user = find(USERS, { id });
    return user;
  }

  /**
   * Récupère les rôles de l'utilisateur actuellement authentifié.
   *
   * @returns {string[]} Les rôles de l'utilisateur
   */
  getUserRoles(): string[] {
    const user = this.getUser();
    if (!user) {
      return [];
    }
    return user.roles || [];
  }
}
