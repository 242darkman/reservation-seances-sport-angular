import { EventEmitter, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
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

  setCurrentUser(user: User | null | undefined) {
    this.isCurrentlyAuthenticated = !!user;
    this.isAuthenticatedEmitter.emit(this.isCurrentlyAuthenticated);
  }

  login(userName: string) {
    const apiLoginUrl = 'api/users';
    return this.http.get<User>(`${apiLoginUrl}/?userName=${userName}`).pipe(
      map(user => {
        this.isCurrentlyAuthenticated = !!user;
        this.isAuthenticatedEmitter.emit(this.isCurrentlyAuthenticated);
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('app_token');
    this.isCurrentlyAuthenticated = false;
    this.isAuthenticatedEmitter.emit(this.isCurrentlyAuthenticated);
  }

  generateToken(user: User): string {
    const expire = Math.floor(Date.now() / 1000) + 60 * 60;
    const userInfo = { ...user, expire };
    const stringifyUser = JSON.stringify(userInfo);
    const encodeUser = btoa(stringifyUser);
    return encodeUser;
  }

  verifyToken(token: string): boolean {
    const decodeUser = atob(token);
    const parsedUser = JSON.parse(decodeUser);
    const currentTime = Math.floor(Date.now() / 1000);
    const tokenExpiration = get(parsedUser, 'expire');
    return currentTime < tokenExpiration;
  }

  getUserIdFromToken(token: string): number {
    const decodeToken = atob(token);
    const user = JSON.parse(decodeToken);
    const userId = get(user, 'id');
    return userId;
  }

  getToken(): string {
    const token = localStorage.getItem('app_token');
    if (isNull(token) || isUndefined(token) || isEmpty(token)) {
      return '';
    }

    return token;
  }

  getUser() {
    const token = this.getToken();
    if (isEmpty(token)) {
      return;
    }
    const id = this.getUserIdFromToken(token);
    const user = find(USERS, { id });
    return user;
  }
}
