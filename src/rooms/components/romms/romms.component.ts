import { Component } from '@angular/core';
import { RoomsService } from '../../services/rooms.service';
import { Room } from '../../room.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddReserveComponent } from '../../../reserves/add-reserve/add-reserve.component';
import { ReservesService } from '../../../reserves/services/reserves.service';
import { SwalFireService } from '../../../globals/services/swal-fire.service';
import { UsersService } from '../../../users/services/users.service';
import { Reserve } from '../../../reserves/reserve.interface';
import { HotelsService } from '../../../hotels/services/hotels.service';

@Component({
  selector: 'app-romms',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './romms.component.html',
  styleUrl: './romms.component.css',
})
export class RommsComponent {
  hotels: any = [];
  romms: Room[] = [];
  romms$: Observable<any> = new Observable();
  hotelId: any;
  hotelSelected: any;
  constructor(
    private roomsService: RoomsService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private reservesService: ReservesService,
    private swalFire: SwalFireService,
    private usersService: UsersService,
    private router: Router,
    private hotelService: HotelsService
  ) {}

  ngOnInit(): void {
    this.romms$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.hotelId = params.get('id');
        this.getHotelById();
        this.getRoomsByHotelId();
        return this.roomsService.getRoomsByHotelId(this.hotelId);
      })
    );
  }

  getHotelById() {
    this.hotelService.getHotelById(this.hotelId).subscribe( hotel => {
      this.hotelSelected = hotel;
    })
  }

  getRoomsByHotelId() {
    this.roomsService.getRoomsByHotelId(this.hotelId).subscribe((romms: any) => {
      this.romms = romms;
    })
  }

  reserve(romm: any) {
    const dialogRef = this.dialog.open(AddReserveComponent, {
      data: {
        fullName: '',
        birthday: '',
        gender: '',
        documentType: '',
        document: '',
        phone: '',
        email: '',
        contactPhone: '',
        contactName: '',
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const user: any = JSON.parse(JSON.stringify(result)) as any;
        this.usersService.addUser(user).subscribe((user: any) => {
          if (user) {
            const reserve: Reserve = {
              userId: user._id,
              roomId: romm._id,
              hotelId: romm.hotel,
              active: true,
              date: new Date(),
              status: 'Pendiente'
            };
            this.reservesService.addReserve(reserve).subscribe((reserve) => {
              this.swalFire.successMessage(
                'Perfecto!',
                'Reserva realizada con éxito'
              );
              setTimeout(() => {
                this.router.navigateByUrl('/home');
              }, 2000);
            });
          }
        });
      }
    });
  }

  handleMissingImage(event: any, romm: any) {
    const index = this.romms.findIndex((item) => item._id === romm.id);
    this.romms[index].image = '/assets/photo10.jpeg';
  }
}
