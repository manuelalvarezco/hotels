import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../globals/services/local-storage.service';
import { Reserve } from '../reserve.interface';
import { Observable, of } from 'rxjs';
import { UsersService } from '../../users/services/users.service';
import { HotelsService } from '../../hotels/services/hotels.service';

@Injectable({
  providedIn: 'root'
})
export class ReservesService {

  private reserves = [];

  constructor(private localStorageService: LocalStorageService, private usersService:UsersService, private hotelsService: HotelsService) { }

  getReserves(): Observable<Reserve[]> {
    const localReserves = this.localStorageService.getData('reserves');
    const reserves = localReserves ? JSON.parse(localReserves) : this.reserves;    
    reserves.forEach((reserve: any) => {
      reserve.userName = this.usersService.getUserById(reserve.userId)?.fullName,
      reserve.hotelName = this.hotelsService.getHotelById(reserve.hotelId)?.name
    });
    return of(reserves);
  }

  getReserveByUserId(userId: number) {
    const localReserves = this.localStorageService.getData('reserves');
    const response = localReserves ? JSON.parse(localReserves) : this.reserves;
    const reserves = response.find((reserve: any) => reserve.userId === userId);
    return reserves;
  }

  addReserve(reserve: Reserve) {
    const localReserves = this.localStorageService.getData('reserves');
    const reserves = localReserves ? JSON.parse(localReserves) : this.reserves;
    reserves.push({
      ...reserve,
      id: reserves.length + 1,
    });
    this.localStorageService.saveData('reserves', JSON.stringify(reserves));
    const respose: any = this.localStorageService.getData('reserves');
    return of(JSON.parse(respose));
  }

}
