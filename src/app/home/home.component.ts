import { Component } from '@angular/core';
import { BannerComponent } from '../../globals/banner/banner.component';
import { HotelsListComponent } from '../../hotels/hotels-list/hotels-list.component';
import { OurServicesComponent } from '../../hotels/our-services/our-services.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BannerComponent,
    HotelsListComponent,
    OurServicesComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
