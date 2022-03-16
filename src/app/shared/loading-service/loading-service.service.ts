import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
/**
 * Cant implement due to mat-paginator undefined issue
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
