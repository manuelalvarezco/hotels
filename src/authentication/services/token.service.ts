import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  isAuth(): boolean {
    const token = this.getToken();    
    return token?.length ? true : false;
  }

  saveToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    const token = localStorage.getItem('token');
    return token;
  }
}
