import { Injectable } from '@angular/core';
import { Hotel } from '../hotel.interface';
import { of } from 'rxjs';
import { LocalStorageService } from '../../globals/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  private hotels = [
    {
      id: 1,
      name: 'Stay Home',
      city: 'Bogota',
      country: 'Colombia',
      state: 'Bogota',
      rating: 4.5,
      price: 200,
      active: true,
      image:
        'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 2,
      name: 'Urban Retreat',
      city: 'Bogota',
      country: 'Colombia',
      state: 'Bogota',
      rating: 4.8,
      price: 350,
      active: true,
      image:
        'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 3,
      name: 'Beachside Bliss',
      city: 'Bogota',
      country: 'Colombia',
      state: 'Bogota',
      rating: 4.7,
      price: 450,
      active: true,
      image:
        'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 4,
      name: 'Mountain Escape',
      city: 'Bogota',
      country: 'Colombia',
      state: 'Bogota',
      rating: 4.9,
      price: 300,
      active: true,
      image:
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 5,
      name: 'City Lights Hotel',
      city: 'Bogota',
      country: 'Colombia',
      state: 'Bogota',
      rating: 4.6,
      price: 275,
      active: true,
      image:
        'https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 6,
      name: 'Luxury Suite',
      city: 'Bogota',
      country: 'Colombia',
      state: 'Bogota',
      rating: 4.8,
      price: 500,
      active: true,
      image:
        'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 7,
      name: 'Cozy Corner',
      city: 'Bogota',
      country: 'Colombia',
      state: 'Bogota',
      rating: 4.4,
      price: 220,
      active: true,
      image:
        'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 8,
      name: 'Ocean View Retreat',
      city: 'Bogota',
      country: 'Colombia',
      state: 'Bogota',
      rating: 4.7,
      price: 350,
      active: true,
      image:
        'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 9,
      name: 'Historic Charm',
      city: 'Bogota',
      country: 'Colombia',
      state: 'Bogota',
      rating: 4.6,
      price: 275,
      active: true,
      image:
        'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 10,
      name: 'Modern Oasis',
      city: 'Bogota',
      country: 'Colombia',
      state: 'Bogota',
      rating: 4.5,
      price: 290,
      active: true,
      image:
        'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  constructor(private localStorageService: LocalStorageService) {}

  getHotels(filter?: any): Promise<Hotel[]> {
    const localHotels = this.localStorageService.getData('hotels');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const response = localHotels ? JSON.parse(localHotels) : this.hotels;
        let hotels = filter ? response?.filter((hotel: any) => hotel.active) : response;        
        hotels = filter ? hotels?.slice(0, filter) : response;
        resolve(hotels);
      }, 500);
    });
  }

  getHotelById(id: number) {
    const localHotels = this.localStorageService.getData('hotels');
    const response = localHotels ? JSON.parse(localHotels) : this.hotels;
    const hotel = response.find((hotel: any) => hotel.id === id);
    return hotel;
  }

  addHotel(hotel: Hotel) {
    const localHotels = this.localStorageService.getData('hotels');
    const hotels = localHotels ? JSON.parse(localHotels) : this.hotels;
    hotels.push({
      ...hotel,
      id: hotels.length + 1,
      rating: 4.5,
      active: true,
    });
    this.localStorageService.saveData('hotels', JSON.stringify(hotels));
    const respose: any = this.localStorageService.getData('hotels');
    return of(JSON.parse(respose));
  }

  editHotel(id: number, hotel: Hotel) {
    const localHotels: any = this.localStorageService.getData('hotels');
    const hotels = localHotels ? JSON.parse(localHotels) : this.hotels;
    const indexHotel = hotels.findIndex((hotel: any) => hotel.id === id);
    if (indexHotel >= 0) {
      hotels[indexHotel] = { ...hotel, id, active: true };
    }
    this.localStorageService.saveData('hotels', JSON.stringify(hotels));
    return of(hotels);
  }

  dupdateHotel(id: number, hotel: Hotel) {
    const localHotels: any = this.localStorageService.getData('hotels');
    const hotels = localHotels ? JSON.parse(localHotels) : this.hotels;
    const indexHotel = hotels.findIndex((hotel: any) => hotel.id === id);
    if (indexHotel >= 0) {
      hotels[indexHotel] = { ...hotel, id, active: !hotel.active };
    }
    this.localStorageService.saveData('hotels', JSON.stringify(hotels));
    return of(hotels);
  }

  getHotelCities() {
    const localHotels: any = this.localStorageService.getData('hotels');
    const hotels = localHotels ? JSON.parse(localHotels) : this.hotels;
    const cities = hotels.map((element: any) => element.city);
    return of(this.removeDuplicates(cities));
  }

  removeDuplicates(arr: any) {
    return arr.filter((item: any, index: number) => arr.indexOf(item) === index);
  }
}
