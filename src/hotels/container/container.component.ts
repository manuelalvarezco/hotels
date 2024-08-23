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
export class ContainerComponent implements OnInit {
  hotels: Hotel[] = [];

  constructor(private hotelsService: HotelsService) {}

  ngOnInit(): void {
    this.getHotels();
  }

  getHotels() {
    this.hotelsService.getHotels().then((hotels) => {
      this.hotels = hotels.filter((hotel: any) => hotel.active);
    });
  }

  handleMissingImage(event: any, hotel: any) {
    const index = this.hotels.findIndex((item) => item.id === hotel.id);
    this.hotels[index].image = 'https://images.pexels.com/photos/5371575/pexels-photo-5371575.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  }
}
