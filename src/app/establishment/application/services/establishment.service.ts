import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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

  private establishmentsUrl = 'api/establishments';
  constructor(private http: HttpClient, private memory: InMemoryDataService) {}

  getEstablishments(): Observable<Establishment[]> {
    return this.http
      .get<Establishment[]>(this.establishmentsUrl)
      .pipe(
        tap(),
        catchError(this.handleError<Establishment[]>('getEstablishments', []))
      );
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

  updateEstablishment(establishment: Establishment): Observable<Establishment> {
    const url = `${this.establishmentsUrl}/${establishment.id}`;
    return this.http
      .put<Establishment>(url, establishment, this.httpOptions)
      .pipe(
        tap(() => console.log()),
        catchError(this.handleError<Establishment>('updateEstablishment'))
      );
  }

  deleteEstablishment(id: number): Observable<Establishment> {
    const url = `${this.establishmentsUrl}/${id}`;
    return this.http
      .delete<Establishment>(url, this.httpOptions)
      .pipe(
        tap(),
        catchError(this.handleError<Establishment>('deleteEstablishment'))
      );
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
