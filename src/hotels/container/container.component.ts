import { Component, OnInit } from '@angular/core';
import { HotelsListComponent } from '../hotels-list/hotels-list.component';
import { HotelsService } from '../services/hotels.service';
import { Hotel } from '../hotel.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [HotelsListComponent, RouterLink],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
})
export class ContainerComponent {
}
