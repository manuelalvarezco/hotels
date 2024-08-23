import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private TOKEN = environment.TOKEN;
  private headers = { Authorization: `Bearer ${this.TOKEN}` };

  private UNIVERSAL_API = environment.UNIVERSAL_API;

  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http
      .get(`${this.UNIVERSAL_API}/countries/`, { headers: this.headers })
      .pipe(retry(3));
  }

  getStates(country: string) {
    return this.http
      .get(`${this.UNIVERSAL_API}/states/${country}`, { headers: this.headers })
      .pipe(retry(3));
  }
  getCities(city: string) {
    return this.http
      .get(`${this.UNIVERSAL_API}/cities/${city}`, {
        headers: this.headers,
      })
      .pipe(retry(3));
  }
}
