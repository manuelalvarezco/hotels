import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, of, retry } from 'rxjs';
import { LocalStorageService } from '../../globals/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private URL = environment.BACKEND_URL;
  private headers = {};

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    const authToken = this.localStorageService.getData('auth_token');
    this.headers = {
      token: `${authToken}`,
    };
  }

  getAccesstoken() {
    return this.http.get(`${this.URL}/locations/getAccesstoken`).pipe(
      retry(2),
      map((response: any) => {
        this.localStorageService.saveData('auth_token', response.auth_token);
        return response;
      })
    );
  }
  getCountries() {
    return this.http.get(`${this.URL}/locations/countries`, {
      headers: this.headers,
    });
  }

  getStates(country: string) {
    return this.http.get(`${this.URL}/locations/states/${country}`, {
      headers: this.headers,
    });
  }
  getCities(city: string) {
    return this.http.get(`${this.URL}/locations/cities/${city}`, {
      headers: this.headers,
    });
  }
}
