import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { InMemoryDataService } from '@/app/in-memory-data.service';
import { Injectable } from '@angular/core';
import { USERS } from '@/app/user/mock/mock-users';
import { User } from '@/app/user/domain/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private usersUrl = 'api/users';

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient, private memory: InMemoryDataService) {}

  getUsers(): void {
    this.http
      .get<User[]>(this.usersUrl)
      .pipe(
        tap(() => console.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      )
      .subscribe(users => {
        this.usersSubject.next(users);
      });
  }

  getUserNo404(id: number): Observable<User> {
    const url = `${this.usersUrl}/?id=${id}`;
    return this.http.get<User[]>(url).pipe(
      map(users => users[0]),
      tap(u => {
        const outcome = u ? 'fetched' : 'did not find';
        console.log(`${outcome} user id=${id}`);
      }),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(() => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
      tap(newUser => {
        const currentValue = this.usersSubject.getValue();
        this.usersSubject.next([...currentValue, newUser]);
      }),
      catchError(this.handleError<User>('addUser'))
    );
  }

  deleteUser(id: number, callback: (success: boolean) => void): void {
    const url = `${this.usersUrl}/${id}`;
    this.http
      .delete<User>(url, this.httpOptions)
      .pipe(
        tap(() => {
          const currentValue = this.usersSubject.getValue();
          const updatedUsers = currentValue.filter(user => user.id !== id);
          this.usersSubject.next(updatedUsers);
          callback(true);
        }),
        catchError(this.handleError<User>('deleteUser'))
      )
      .subscribe({
        error: err => {
          console.error(err);
          callback(false);
        },
      });
  }

  updateUser(user: User, callback: (success: boolean) => void): void {
    const url = `${this.usersUrl}/${user.id}`;
    this.http
      .put<User>(url, user, this.httpOptions)
      .pipe(
        tap(updatedUser => {
          const currentValue = this.usersSubject.getValue();
          const updatedUsers = currentValue.map(u =>
            u.id === updatedUser.id ? updatedUser : u
          );
          this.usersSubject.next(updatedUsers);
          callback(true);
        }),
        catchError(err => {
          this.handleError<User>(`updateUser ${err.message}`);
          callback(false);
          return of(null);
        })
      )
      .subscribe();
  }

  generateId(): number {
    const users = USERS;
    const id = this.memory.genId(users);
    return id;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: unknown): Observable<T> => {
      console.error(`${operation} failed: ${error}`);
      return of(result as T);
    };
  }
}
