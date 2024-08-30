import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReservesService } from '../../../reserves/services/reserves.service';
import { AddReserveComponent } from '../../../reserves/add-reserve/add-reserve.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../../users/services/users.service';
import { HotelsService } from '../../../hotels/services/hotels.service';

@Component({
  selector: 'app-bookings-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings-management.component.html',
  styleUrl: './bookings-management.component.css',
})
export class BookingsManagementComponent implements OnInit {
  constructor(
    private reservesService: ReservesService,
    public dialog: MatDialog,
    private usersService: UsersService,
    private hotelsService: HotelsService
  ) {}

  reserves: any[] = [];
  hotels: any[] = [];
  users: any[] = [];

  ngOnInit(): void {
    this.getHotels();
  }

  getHotels() {
    this.hotelsService.getHotels().subscribe((hotels: any) => {
      this.hotels = hotels;
      this.getUsers();
    });
  }

  getUsers() {
    this.usersService.getUsers().subscribe((users: any) => {
      this.users = users;
      this.loadBookings();
    })
  }

  loadBookings(): void {
    this.reservesService.getReserves().subscribe((reserves: any) => {
      this.reserves = reserves;
      this.reserves.map((reserve) => {
        reserve.hotelName = this.hotels.find((hotel: any) => hotel.id === reserve.hotelId)?.name;
        reserve.userName = this.users.find((user: any) => user.id === reserve.userId)?.fullName;
        return reserve;
      })
    });
  }

  detail(reserve: any) {
    this.usersService.getUserById(reserve.userId).subscribe((user: any) => {
      const dialogRef = this.dialog.open(AddReserveComponent, {
        data: {
          fullName: user.fullName,
          birthday: user.birthday,
          gender: user.gender,
          documentType: user.documentType,
          document: user.document,
          phone: user.phone,
          email: user.email,
          contactPhone: user.contactPhone,
          contactName: user.contactName,
          detail: true,
        },
        width: '500px',
      });

    })

  }
}
