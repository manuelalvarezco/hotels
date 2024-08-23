import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RoomsService } from '../../../rooms/services/rooms.service';
import { SwalFireService } from '../../../globals/services/swal-fire.service';
import { Room } from '../../../rooms/room.interface';
import { AddRommComponent } from '../../shared/add-romm/add-romm.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-room-management',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './room-management.component.html',
  styleUrl: './room-management.component.css',
})
export class RoomManagementComponent implements OnInit {
  romms: any[] = [];

  constructor(
    public dialog: MatDialog,
    private roomsService: RoomsService,
    private swalFire: SwalFireService
  ) {}

  ngOnInit(): void {
    this.loadRomms();
  }

  loadRomms(): void {
    this.roomsService.getRooms().then((romms: any) => {
      this.romms = romms;      
    });
  }

  addRomm() {
    const dialogRef = this.dialog.open(AddRommComponent, {
      data: { name: '', location: '', image: '', hotel: '',  },
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const romm = JSON.parse(JSON.stringify(result)) as any;
        this.roomsService.addRoom(romm).subscribe((romms: any) => {
          this.romms = romms;
          this.swalFire.successMessage(
            'Perfecto!',
            'Habitación creada con éxito'
          );
        });
      }
    });
  }

  editRomm(item: Room) {    
    const dialogRef = this.dialog.open(AddRommComponent, {
      data: {
        name: item.name,
        image: item.image,
        price: item.price,
        hotel: item.hotel,
        hotelName: item.hotelName,
        tax: item.tax,
        rommType: item.rommType,
        location: item.location,
      },
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const romm = JSON.parse(JSON.stringify(result)) as any;
        const rommId = typeof romm.hotel === 'string' ? item.hotel : romm.hotel;
        this.roomsService
          .editRomm(item.id, { ...romm, hotel: rommId })
          .subscribe((hotels: any) => {
            this.romms = hotels;
            this.swalFire.successMessage(
              'Perfecto!',
              'Hotel actualizado con éxito'
            );
          });
      }
    });
  }

  updateRomm(hotel: Room) {
    const action = hotel.active ? 'desactivar' : 'activar';
    this.swalFire
      .confirmActionMessage(
        `¿Está seguro de ${action} esta habitación?`,
        `${action}`
      )
      .then((result: any) => {
        if (result.isConfirmed) {
          this.roomsService
            .updateRomm(hotel.id, hotel)
            .subscribe((romms: any) => {
              this.romms = romms;
              this.swalFire.successMessage(
                'Perfecto!',
                'Proceso realizado con éxito'
              );
            });
        }
      });
  }
}
