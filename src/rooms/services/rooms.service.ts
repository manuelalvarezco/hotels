import { Injectable } from '@angular/core';
import { Room } from '../room.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private URL = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  getRooms(params?: any) {
    return this.http.get(`${this.URL}/romms`, { params });
  }

  getRoomsByHotelId(hotel: number) {
    return this.http.get(`${this.URL}/romms/hotel/${hotel}`);
  }

  addRoom(room: Room) {
    return this.http.post(`${this.URL}/romms`, room);
  }

  editRomm(id: number, romm: Room) {
    return this.http.patch(`${this.URL}/romms/${id}`, romm);
  }

  updateRomm(id: number, romm: Room) {
    return this.http.patch(`${this.URL}/romms/${id}/update`, romm);
  }
}
