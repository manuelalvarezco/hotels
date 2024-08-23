import { Component, Input, OnInit } from '@angular/core';
import { HotelsService } from '../services/hotels.service';
import { Hotel } from '../hotel.interface';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hotels-list',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './hotels-list.component.html',
  styleUrl: './hotels-list.component.css'
})
export class HotelsListComponent implements OnInit {
  @Input() filter: any;
  hotels: Hotel[] = [];
  constructor(private hotelService: HotelsService) {}
  ngOnInit(): void {
    this.getHotels();
  }

  getHotels() {
    this.hotelService.getHotels(this.filter)
      .then((hotels: Hotel[]) => {
        this.hotels = hotels;
      })
  }

  handleMissingImage(event: any, hotel: any) {
    const index = this.hotels.findIndex((item) => item.id === hotel.id);
    this.hotels[index].image = 'https://images.pexels.com/photos/5371575/pexels-photo-5371575.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  }

}
