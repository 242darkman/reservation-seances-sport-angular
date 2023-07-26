import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Establishment, FormattedOpeningHour} from '@/app/establishment/domain/establishment';
import { InMemoryDataService } from '@/app/in-memory-data.service';
import {OpeningHour} from "@/app/session/domain/session";

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
    return this.http.get<Establishment[]>(this.establishmentsUrl).pipe(
      tap(() => console.log('fetched establishment')),
      catchError(this.handleError<Establishment[]>('getEstablishments', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: unknown): Observable<T> => {
      console.error(`${operation} failed: ${error}`);
      return of(result as T);
    };
  }

  formatOpeningHours(openingHours: Pick<OpeningHour, 'startTime' | 'endTime' | 'dayOfWeek'>[]): FormattedOpeningHour {
    const daysOfWeek = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];

    const formattedOpeningHours = openingHours.map((availability) => {
      const startHour = availability.startTime;
      const endHour = availability.endTime;
      const day = daysOfWeek.find((day) => day.startsWith(availability.dayOfWeek.slice(0, 3))) || '';
      return `${day} ${startHour} - ${endHour}`;
    });

    return { formattedDayAndHours: formattedOpeningHours.join(', ') };
  }
}
