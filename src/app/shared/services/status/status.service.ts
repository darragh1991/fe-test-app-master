import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Status } from '../../models/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statuses: Status[];
  constructor(private _httpClient: HttpClient) { }

  getStatuses$(): Observable<Status> {
    return this.statuses ? of(this.statuses) :
    this._httpClient.get<Status>('http://localhost:3000/statuses').pipe(map((data: Status) => {
      if(data) {
        return this.statuses = data.data;
      }
    }), catchError(this.handleError));
  }

  private handleError(error): Observable<never> {
    return throwError(error)
  }
  }
