import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private callHeaderMethodSubject = new BehaviorSubject<void>(null);
  callHeaderMethod$ = this.callHeaderMethodSubject.asObservable();

  triggerCallHeaderMethod() {
    this.callHeaderMethodSubject.next();
  }
}
