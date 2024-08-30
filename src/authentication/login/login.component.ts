import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../users/services/users.service';
import { NavbarService } from '../../globals/services/navbar.service';
import { LocationsService } from '../../locations/services/locations.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UsersService,
    private navbarService: NavbarService,
    private locationsService: LocationsService
  ) {}

  currentForm: string = 'signIn';
  formLogin: any;
  formRegister: any;

  toggleForm(form: string): void {
    this.currentForm = form;
  }

  ngOnInit(): void {
    this.buildFormLogin();
    this.buildFormRegister();
  }

  buildFormLogin() {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  buildFormRegister() {
    this.formRegister = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authService.login(this.formLogin.value).subscribe(
      (resp) => {
        if (resp.access_token) {
          this.authService.grantedAccess();
          this.navbarService.openClose(true);
          this.router.navigateByUrl('/admin');
        }
      },
      () => {
        this.authService.accessDenied('Login');
      }
    );
  }
}
