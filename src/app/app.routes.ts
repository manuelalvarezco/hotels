import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContainerComponent } from '../hotels/container/container.component';
import { LoginComponent } from '../authentication/login/login.component';
import { UsersComponent } from '../admin/componets/users/users.component';
import { HotelManagementComponent } from '../admin/componets/hotel-management/hotel-management.component';
import { BookingsManagementComponent } from '../admin/componets/bookings-management/bookings-management.component';
import { SidebarComponent } from '../admin/componets/sidebar/sidebar.component';
import { RoomManagementComponent } from '../admin/componets/room-management/room-management.component';
import { RommsComponent } from '../rooms/components/romms/romms.component';
import { authGuard } from '../authentication/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hotels', component: ContainerComponent },
  { path: 'romms/hotel/:id', component: RommsComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin', 
    canActivate: [ authGuard ],
    component: SidebarComponent,
    children: [
      { path: 'user-management', component: UsersComponent },
      { path: 'hotel-management', component: HotelManagementComponent },
      { path: 'manage-bookings', component: BookingsManagementComponent },
      { path: 'manage-romms', component: RoomManagementComponent },
      { path: '', redirectTo: 'user-management', pathMatch: 'full' }
    ]
  },
  { path: '**', component: HomeComponent },
];
