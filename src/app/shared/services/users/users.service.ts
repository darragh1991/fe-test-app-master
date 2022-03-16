import { DbData } from './../../models/dbData';
import { UserParams } from './../../models/userParams';
import { CleanData } from 'src/app/shared/models/cleanData';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Users } from '../../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly baseUrl: string = `http://localhost:3000/users`;

  constructor(private _httpClient: HttpClient) {
  }

  getUsersByUrl$(params: string | UserParams = ''): Observable<Users> {

    const url: string = `${this.baseUrl}/${params.toString()}`;
    return this._httpClient.get<Users>(url).pipe(map((users) => {
      if (users) {
        return users.data
      }
    }),
    catchError(this.handleError)
    );
  }

  getUsersByParams$(params?): Observable<Users> {
    return this._httpClient.get<Users>(this.baseUrl, {
       params: {
         ...params
       }
     }).pipe(map((users) => {
      if (users) {
        return users
      }
    }),
    catchError(this.handleError)
    );
  }


  createUser(newUserData: CleanData): Observable<any> {
    return this._httpClient.post<CleanData>(`http://localhost:3000/users`, newUserData)
          .pipe(map((response) => {
            console.log(response);
              return response;
          }), catchError(this.handleError)
        );
  }


  private handleError(error): Observable<never> {
    return throwError(error)
  }
}
