import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {

  private URL = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http.get(`${this.URL}/locations/countries`);
  }

  getStates(country: string) {
    return this.http.get(`${this.URL}/locations/states/${country}`);
  }
  getCities(city: string) {
    return this.http.get(`${this.URL}/locations/cities/${city}`);
  }
}
