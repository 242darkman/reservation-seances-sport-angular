import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '@/app/user/domain/user';
import { InMemoryDataService } from '@/app/in-memory-data.service';
import { USERS } from '@/app/user/mock/mock-users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private usersUrl = 'api/users';

  constructor(private http: HttpClient, private memory: InMemoryDataService) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      tap(() => console.log('fetched users')),
      catchError(this.handleError<User[]>('getUsers', [])),
    );
  }

  getUserNo404(id: number): Observable<User> {
    const url = `${this.usersUrl}/?id=${id}`;
    return this.http.get<User[]>(url).pipe(
      map((users) => users[0]),
      tap((u) => {
        const outcome = u ? 'fetched' : 'did not find';
        console.log(`${outcome} user id=${id}`);
      }),
      catchError(this.handleError<User>(`getUser id=${id}`)),
    );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(() => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`)),
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
      tap(() => console.log()),
      catchError(this.handleError<User>('addUser')),
    );
  }

  deleteUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(() => console.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser')),
    );
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.put<User>(url, user, this.httpOptions).pipe(
      tap(() => console.log()),
      catchError(this.handleError<User>('updateUser')),
    );
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
