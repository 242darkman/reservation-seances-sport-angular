import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Establishment } from '@/app/establishment/domain/establishment';
import { InMemoryDataService } from '@/app/in-memory-data.service';
import { ESTABLISHMENTS } from '../../mock/mock-establishment';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private establishmentSubject = new BehaviorSubject<Establishment[]>([]);
  establishment$ = this.establishmentSubject.asObservable();

  private establishmentsUrl = 'api/establishments';
  constructor(private http: HttpClient, private memory: InMemoryDataService) {}

  getEstablishments(): void {
    this.http
      .get<Establishment[]>(this.establishmentsUrl)
      .pipe(
        tap(),
        catchError(this.handleError<Establishment[]>('getEstablishments', []))
      )
      .subscribe(establishments => {
        this.establishmentSubject.next(establishments);
      });
  }

  getEstablishment(id: number): Observable<Establishment> {
    const url = `${this.establishmentsUrl}/${id}`;
    return this.http
      .get<Establishment>(url)
      .pipe(
        tap(),
        catchError(this.handleError<Establishment>(`Establishment id=${id}`))
      );
  }

  addEstablishment(establishment: Establishment): Observable<Establishment> {
    return this.http
      .post<Establishment>(
        this.establishmentsUrl,
        establishment,
        this.httpOptions
      )
      .pipe(
        tap(() => console.log()),
        catchError(this.handleError<Establishment>('addEstablishment'))
      );
  }

  insertEstablishment(establishment: Establishment): Observable<Establishment> {
    return this.http
      .post<Establishment>(this.establishmentsUrl, establishment, this.httpOptions)
      .pipe(
        tap(newBooking => {
          const currentValue = this.establishmentSubject.getValue();
          this.establishmentSubject.next([...currentValue, newBooking]);
        }),
        catchError(this.handleError<Establishment>('insertEstablishment'))
      );
  }

  updateEstablishment(
    establishment: Establishment,
    callback: (success: boolean) => void
  ): void {
    const url = `${this.establishmentsUrl}/${establishment.id}`;
    this.http
      .put<Establishment>(url, establishment, this.httpOptions)
      .pipe(
        tap(updatedUser => {
          const currentValue = this.establishmentSubject.getValue();
          const updatedUsers = currentValue.map(u =>
            u.id === updatedUser.id ? updatedUser : u
          );
          this.establishmentSubject.next(updatedUsers);
          callback(true);
        }),
        catchError(err => {
          this.handleError<Establishment>(`UpdateEstablishment ${err.message}`);
          callback(false);
          return of(null);
        })
      )
      .subscribe();
  }

  deleteEstablishment(id: number, callback: (success: boolean) => void): void {
    const url = `${this.establishmentsUrl}/${id}`;
    this.http
      .delete<Establishment>(url, this.httpOptions)
      .pipe(
        tap(() => {
          const currentValue = this.establishmentSubject.getValue();
          const update = currentValue.filter(
            establishment => establishment.id !== id
          );
          this.establishmentSubject.next(update);
          callback(true);
        }),
        catchError(this.handleError<Establishment>('delete establishment'))
      )
      .subscribe({
        error: err => {
          console.error(err);
          callback(false);
        },
      });
  }

  generateId(): number {
    const establishments = ESTABLISHMENTS;
    const id = this.memory.EstablishmentId(establishments);
    return id;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: unknown): Observable<T> => {
      console.error(`${operation} failed: ${error}`);
      return of(result as T);
    };
  }
}
