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

@Component({
  selector: 'app-romms',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './romms.component.html',
  styleUrl: './romms.component.css',
})
export class RommsComponent {
  romms: Room[] = [];
  romms$: Observable<Room[]> = new Observable();

  constructor(
    private roomsService: RoomsService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private reservesService: ReservesService,
    private swalFire: SwalFireService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRomms();
  }

  getRomms() {
    this.romms$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.roomsService.getRoomsByHotelId(id);
      })
    );

    this.romms$.subscribe((resp) => {
      this.romms = resp;
    });
  }

  reserve(romm: Room) {
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
        const user = JSON.parse(JSON.stringify(result)) as any;
        this.usersService.addUser(user).subscribe((user) => {
          if (user) {            
            const reserve: Reserve = {
              userId: user.id,
              roomId: romm.id,
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
    const index = this.romms.findIndex((item) => item.id === romm.id);
    this.romms[index].image = '/assets/photo10.jpeg';
  }
}
