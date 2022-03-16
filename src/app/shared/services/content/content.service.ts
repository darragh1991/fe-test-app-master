import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Content } from '../../models/content';

@Injectable({
  providedIn: 'root'
})
export class ContentService {


  private userContent: Content;

  constructor(private _httpClient: HttpClient) { }

  getContent$(lang = 'ENG'): Observable<Content> {
    return this.userContent ? of(this.userContent) :
     this._httpClient.get<Content>('http://localhost:3000/content/', {
       params: {
         lang: lang
       }
     }).pipe(map((data) => {
      if (data) {
        return this.userContent = data;
      }
    }), catchError(this.handleError));
  }

  private handleError(error): Observable<never> {
    return throwError(error);
  }
}
