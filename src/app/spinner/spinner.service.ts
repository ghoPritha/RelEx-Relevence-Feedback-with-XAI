import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  visibility: BehaviorSubject<boolean>;
  private count = 0;

  private spinner$ = new BehaviorSubject<string>('');

  constructor() {
    this.visibility = new BehaviorSubject<boolean>(false);
  }
  getSpinnerObserver(): Observable<string> {
    return this.spinner$.asObservable();
  }
  show() {
    this.visibility.next(true);
  }

  hide() {
    this.visibility.next(false);
  }
}
