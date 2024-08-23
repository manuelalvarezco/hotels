import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReservesService } from '../../../reserves/services/reserves.service';
import { AddReserveComponent } from '../../../reserves/add-reserve/add-reserve.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../../users/services/users.service';

@Component({
  selector: 'app-bookings-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings-management.component.html',
  styleUrl: './bookings-management.component.css',
})
export class BookingsManagementComponent implements OnInit {
  constructor(private reservesService: ReservesService, public dialog: MatDialog, private usersService: UsersService) {}

  reserves: any[] = [];

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.reservesService.getReserves().subscribe((reserves) => {
      this.reserves = reserves;      
    });
  }

  detail(reserve: any) {
    const user = this.usersService.getUserById(reserve.userId);    
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
        detail: true
      },
      width: '500px',
    });
  }


}
