import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { InMemoryDataService } from '@/app/in-memory-data.service';
import { Injectable } from '@angular/core';
import { USERS } from '@/app/user/mock/mock-users';
import { User } from '@/app/user/domain/user';

/**
 * Le service `UserService` fournit une interface pour manipuler les données utilisateur dans l'application.
 * Il permet de récupérer, ajouter, supprimer et mettre à jour les utilisateurs via des requêtes HTTP.
 *
 * Il utilise un `BehaviorSubject` pour garder une trace de la liste actuelle des utilisateurs, ce qui permet
 * aux autres parties de l'application de s'abonner aux mises à jour de la liste des utilisateurs.
 *
 * @see InMemoryDataService pour la génération des ID utilisateur.
 */
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

  /**
   * Récupère la liste actuelle des utilisateurs depuis l'API et met à jour le `BehaviorSubject`.
   */
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

  /**
   * Récupère un utilisateur par son `id`.
   * Si l'utilisateur n'est pas trouvé, une erreur est renvoyée.
   * @param id - L'identifiant de l'utilisateur à récupérer.
   * @returns Un Observable de l'utilisateur.
   */
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

  /**
   * Récupère un utilisateur par son `id`.
   * @param id - L'identifiant de l'utilisateur à récupérer.
   * @returns Un Observable de l'utilisateur.
   */
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(() => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /**
   * Ajoute un nouvel utilisateur et met à jour le `BehaviorSubject` avec la nouvelle liste des utilisateurs.
   * @param user - L'utilisateur à ajouter.
   * @returns Un Observable de l'utilisateur ajouté.
   */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
      tap(newUser => {
        const currentValue = this.usersSubject.getValue();
        this.usersSubject.next([...currentValue, newUser]);
      }),
      catchError(this.handleError<User>('addUser'))
    );
  }

  /**
   * Supprime un utilisateur par son `id` et met à jour le `BehaviorSubject` avec la nouvelle liste des utilisateurs.
   * @param id - L'identifiant de l'utilisateur à supprimer.
   * @param callback - La fonction à exécuter après la suppression de l'utilisateur.
   */
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

  /**
   * Met à jour un utilisateur existant et met à jour le `BehaviorSubject` avec la nouvelle liste des utilisateurs.
   * @param user - L'utilisateur à mettre à jour.
   * @param callback - La fonction à exécuter après la mise à jour de l'utilisateur.
   */
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

  /**
   * Génère un identifiant unique pour un nouvel utilisateur.
   * @returns Un identifiant numérique unique.
   */
  generateId(): number {
    const users = USERS;
    const id = this.memory.genId(users);
    return id;
  }

  /**
   * Gère les erreurs de requête HTTP.
   * @param operation - Le nom de l'opération pendant laquelle l'erreur s'est produite.
   * @param result - La valeur de retour en cas d'erreur.
   * @returns Un Observable du résultat.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: unknown): Observable<T> => {
      console.error(`${operation} failed: ${error}`);
      return of(result as T);
    };
  }
}
