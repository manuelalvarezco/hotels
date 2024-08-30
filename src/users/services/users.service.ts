import { Injectable } from '@angular/core';
import { User } from '../user.interface';
import { LocalStorageService } from '../../globals/services/local-storage.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private URL = environment.BACKEND_URL;

  constructor(private localStorageService: LocalStorageService, private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.URL}/users`);
  }
  getUserById(id: number) {
    return this.http.get(`${this.URL}/users/${id}`);
  }

  addUser(user: User) {
    return this.http.post(`${this.URL}/users`, user);
  }


}
