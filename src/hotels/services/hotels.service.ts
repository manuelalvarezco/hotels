import { Injectable } from '@angular/core';
import { Hotel } from '../hotel.interface';
import { LocalStorageService } from '../../globals/services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  private URL = environment.BACKEND_URL;

  hotels = [];
  constructor(private localStorageService: LocalStorageService, private http: HttpClient) {}

  getHotels(params?: any) {
    return this.http.get(`${this.URL}/hotels`, {params} );
  }

  getHotelById(id: number) {
    return this.http.get(`${this.URL}/hotels/${id}`);
  }

  addHotel(hotel: Hotel) {
    return this.http.post(`${this.URL}/hotels`, hotel);
  }

  editHotel(id: number, hotel: Hotel) {
    return this.http.patch(`${this.URL}/hotels/${id}`, hotel);

  }

  updateHotel(id: number, hotel: Hotel) {
    return this.http.patch(`${this.URL}/hotels/${id}/update`, hotel);
  }

  getHotelCities() {
    return this.http.get(`${this.URL}/hotels/cities`);
  }
}
