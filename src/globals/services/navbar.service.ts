import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private isAuth = new BehaviorSubject(<boolean>(false));
  isAuth$ = this.isAuth.asObservable();

  constructor() { }

  openClose(action: boolean) {    
    this.isAuth.next(action);
  }
}
