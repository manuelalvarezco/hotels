import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../globals/services/local-storage.service';
import { Reserve } from '../reserve.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservesService {
  private URL = environment.BACKEND_URL;

  constructor(private localStorageService: LocalStorageService, private http: HttpClient) { }

  getReserves() {
    return this.http.get(`${this.URL}/reserves`);
  }

  getReserveByUserId(userId: number) {
    return this.http.get(`${this.URL}/reserves/user/${userId}`);
  }

  addReserve(reserve: Reserve) {
    return this.http.post(`${this.URL}/reserves`, reserve);
  }

}
