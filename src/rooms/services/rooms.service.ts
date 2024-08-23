import { Injectable } from '@angular/core';
import { Room } from '../room.interface';
import { LocalStorageService } from '../../globals/services/local-storage.service';
import { Observable, of } from 'rxjs';
import { HotelsService } from '../../hotels/services/hotels.service';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private romms = [
    {
      id: 1,
      name: 'Stay Home',
      hotel: 1,
      rating: 4.5,
      price: 200,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/20849816/pexels-photo-20849816/free-photo-of-habitacion-jardin-casa-mesa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 2,
      name: 'Urban Retreat',
      hotel: 1,
      rating: 4.8,
      price: 350,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/21012299/pexels-photo-21012299/free-photo-of-madera-verano-edificio-pared.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 3,
      name: 'Beachside Bliss',
      hotel: 1,
      rating: 4.7,
      price: 450,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/21012301/pexels-photo-21012301/free-photo-of-relajacion-cama-habitacion-jardin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 4,
      name: 'Mountain Escape',
      hotel: 1,
      rating: 4.9,
      price: 300,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/26546550/pexels-photo-26546550/free-photo-of-casas-pintura-pintando-cuadro.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 5,
      name: 'City Lights Hotel',
      hotel: 1,
      rating: 4.6,
      price: 275,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/7746549/pexels-photo-7746549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 6,
      name: 'Luxury Suite',
      hotel: 2,
      rating: 4.8,
      price: 500,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/3772615/pexels-photo-3772615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 7,
      name: 'Cozy Corner',
      hotel: 2,
      rating: 4.4,
      price: 220,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/4119832/pexels-photo-4119832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 8,
      name: 'Ocean View Retreat',
      hotel: 2,
      rating: 4.7,
      price: 350,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/11024139/pexels-photo-11024139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 9,
      name: 'Historic Charm',
      hotel: 2,
      rating: 4.6,
      price: 275,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/6473549/pexels-photo-6473549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 10,
      name: 'Modern Oasis',
      hotel: 2,
      rating: 4.5,
      price: 290,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/7601116/pexels-photo-7601116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 11,
      name: 'Luxury Suite',
      hotel: 3,
      rating: 4.8,
      price: 500,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/7575680/pexels-photo-7575680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 12,
      name: 'Cozy Corner',
      hotel: 3,
      rating: 4.4,
      price: 220,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/11516396/pexels-photo-11516396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 13,
      name: 'Ocean View Retreat',
      hotel: 3,
      rating: 4.7,
      price: 350,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/11757075/pexels-photo-11757075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 14,
      name: 'Historic Charm',
      hotel: 3,
      rating: 4.6,
      price: 275,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/11819764/pexels-photo-11819764.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 15,
      name: 'Modern Oasis',
      hotel: 4,
      rating: 4.5,
      price: 290,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/13871326/pexels-photo-13871326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 16,
      name: 'Modern Oasis',
      hotel: 4,
      rating: 4.5,
      price: 290,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/14957439/pexels-photo-14957439/free-photo-of-edificio-escritorio-ventanas-interior.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 17,
      name: 'Modern Oasis',
      hotel: 5,
      rating: 4.5,
      price: 290,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/15253069/pexels-photo-15253069/free-photo-of-apartamento-ventanas-de-cristal-sillas-de-madera-habitaciones.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 18,
      name: 'Modern Oasis',
      hotel: 6,
      rating: 4.5,
      price: 290,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/15828315/pexels-photo-15828315/free-photo-of-vintage-ventanas-techo-suelo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 19,
      name: 'Modern Oasis',
      hotel: 7,
      rating: 4.5,
      price: 290,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/12199880/pexels-photo-12199880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 20,
      name: 'Modern Oasis',
      hotel: 8,
      rating: 4.5,
      price: 290,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/19966797/pexels-photo-19966797/free-photo-of-mesa-pelo-piel-lampara.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 21,
      name: 'Modern Oasis',
      hotel: 9,
      rating: 4.5,
      price: 290,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/19328645/pexels-photo-19328645/free-photo-of-edificio-antiguo-monasterio-ruinas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 22,
      name: 'Modern Oasis',
      hotel: 10,
      rating: 4.5,
      price: 290,
      rommType: 'Sencilla',
      tax: 19,
      location: 'Carrera 9 #10133',
      active: true,
      image:
        'https://images.pexels.com/photos/18117654/pexels-photo-18117654/free-photo-of-luces-noche-hotel-oscuridad.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  constructor(
    private localStorageService: LocalStorageService,
    private hotelsService: HotelsService
  ) {}

  getRooms(filter?: number) {
    const localRooms = this.localStorageService.getData('romms');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const response = localRooms ? JSON.parse(localRooms) : this.romms;
        let romms = filter
          ? response.filter((romm: Room) => romm.active)
          : response;
        romms = filter ? response?.slice(0, filter) : response;
        romms.forEach((romm: any) => {
          romm.hotelName = this.hotelsService.getHotelById(romm.hotel)?.name;
        });
        resolve(romms);
      }, 500);
    });
  }

  getRoomsByHotelId(hotel: number): Observable<Room[]> {
    const localRooms = this.localStorageService.getData('romms');
    const rooms = localRooms
      ? JSON.parse(localRooms).filter((room: any) => room.hotel === hotel)
      : this.romms.filter((room: any) => room.hotel === hotel);
    return of(rooms.filter((romm: Room) => romm.active));
  }

  addRoom(room: Room) {
    const localRooms = this.localStorageService.getData('romms');
    const rooms = localRooms ? JSON.parse(localRooms) : this.romms;
    rooms.push({
      id: rooms.length + 1,
      hotel: room.hotel,
      name: room.name,
      rating: 4.5,
      price: room.price,
      rommType: room.rommType,
      tax: room.tax,
      location: room.location,
      image: room.image,
      active: true,
    });

    this.localStorageService.saveData('romms', JSON.stringify(rooms));
    const respose: any = this.localStorageService.getData('romms');
    const data = JSON.parse(respose);
    data.map((romm: any) => {
      romm.hotelName = this.hotelsService.getHotelById(romm.hotel)?.name;
      return romm;
    });
    return of(data);
  }

  editRomm(id: number, romm: Room) {
    const localRomms: any = this.localStorageService.getData('romms');
    const romms = localRomms ? JSON.parse(localRomms) : this.romms;
    const indexRomm = romms.findIndex((romm: any) => romm.id === id);
    if (indexRomm >= 0) {
      romms[indexRomm] = { ...romm, id };
    }
    this.localStorageService.saveData('romms', JSON.stringify(romms));
    const respose: any = this.localStorageService.getData('romms');
    const data = JSON.parse(respose);
    data.map((romm: any) => {
      romm.hotelName = this.hotelsService.getHotelById(romm.hotel)?.name;
      return romm;
    });
    return of(data);
  }

  updateRomm(id: number, romm: Room) {
    const localRomms: any = this.localStorageService.getData('romms');
    const romms = localRomms ? JSON.parse(localRomms) : this.romms;
    const indexRomm = romms.findIndex((romm: any) => romm.id === id);
    if (indexRomm >= 0) {
      romms[indexRomm] = { ...romm, id, active: !romm.active };
    }
    this.localStorageService.saveData('romms', JSON.stringify(romms));
    return of(romms);
  }
}
