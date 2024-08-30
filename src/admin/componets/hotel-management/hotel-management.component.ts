import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddHotelComponent } from '../../shared/add-hotel/add-hotel.component';
import { HotelsService } from '../../../hotels/services/hotels.service';
import { Hotel } from '../../../hotels/hotel.interface';
import { SwalFireService } from '../../../globals/services/swal-fire.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-hotel-management',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './hotel-management.component.html',
  styleUrl: './hotel-management.component.css',
})
export class HotelManagementComponent {
  hotels: any = [];

  constructor(
    public dialog: MatDialog,
    private hotelsService: HotelsService,
    private swalFire: SwalFireService
  ) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels(): void {
    this.hotelsService.getHotels().subscribe((hotels: any) => {
      this.hotels = hotels;
    })
  }

  addHotel() {
    const dialogRef = this.dialog.open(AddHotelComponent, {
      data: { name: '', country: '', state: '', city: '', image: '', price: '' },
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const hotel = JSON.parse(JSON.stringify(result)) as any;
        this.hotelsService.addHotel(hotel).subscribe((hotels: any) => {
          this.loadHotels();
          this.swalFire.successMessage('Perfecto!', 'Hotel creado con éxito');
        });
      }
    });
  }

  editHotel(item: any) {
    const dialogRef = this.dialog.open(AddHotelComponent, {
      data: { name: item.name, country: item.country, state: item.state, city: item.city, image: item.image, price: item.price },
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const hotel = JSON.parse(JSON.stringify(result)) as any;
        this.hotelsService.editHotel(item._id, hotel).subscribe((hotels: any) => {
          this.loadHotels();
          this.swalFire.successMessage('Perfecto!', 'Hotel actualizado con éxito');
        });
      }
    });
  }

  updateHotel(hotel: any) {
    const action = hotel.active ? 'desactivar' : 'activar';
    this.swalFire.confirmActionMessage(`¿Está seguro de ${action} este hotel?`, `${action}`)
    .then((result: any) => {
      if (result.isConfirmed) {
        this.hotelsService.updateHotel(hotel._id, hotel).subscribe((hotels: any) => {
          this.loadHotels();
          this.swalFire.successMessage('Perfecto!', 'Proceso realizado con éxito');
        });
      }
    });
  }
}
