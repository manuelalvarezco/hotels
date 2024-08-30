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

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

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
    const authToken = this.localStorageService.getData('auth_token');
    const headers = {
      token: `${authToken}`,
    };
    return this.http.get(`${this.URL}/locations/countries`, {
      headers: headers,
    });
  }

  getStates(country: string) {
    const authToken = this.localStorageService.getData('auth_token');
    const headers = {
      token: `${authToken}`,
    };
    return this.http.get(`${this.URL}/locations/states/${country}`, {
      headers: headers,
    });
  }
  getCities(city: string) {
    const authToken = this.localStorageService.getData('auth_token');
    const headers = {
      token: `${authToken}`,
    };
    return this.http.get(`${this.URL}/locations/cities/${city}`, {
      headers: headers,
    });
  }
}
