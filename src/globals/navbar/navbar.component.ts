import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../authentication/services/token.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { NavbarService } from '../services/navbar.service';
import { AuthService } from '../../authentication/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  auth: any;
  openClose$: Observable<boolean>;
  toogleNav = false;
  constructor(private navbarService: NavbarService, private router: Router, private authService: AuthService) {
    this.openClose$ =  this.navbarService.isAuth$;
    this.openClose$.subscribe((openClose) => {
      this.auth = openClose;
      if (!this.auth) {
        localStorage.removeItem('token');
      }
    })
  }

  logout() {
    this.navbarService.openClose(false);
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/home');
    })
  }

  toggleNavbar() {
    this.toogleNav = !this.toogleNav;
  }
}
