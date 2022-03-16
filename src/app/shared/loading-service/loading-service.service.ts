import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
/**
 * Difficult to implement due to mat-paginator undefined issue.. could of asked
 * for svg's and done custom paginator via api call...
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingServiceService {

  private isFinishedLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  public finshedLoading(): Observable<boolean> {
    return this.isFinishedLoading.asObservable();
  }

  public setLoading() {
    this.isFinishedLoading.next(true)
  }
}
