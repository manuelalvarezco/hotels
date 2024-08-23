import { Component, OnInit } from '@angular/core';
import { Service } from '../service.interface';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.css'
})
export class OurServicesComponent implements OnInit {
  services: Service[] = [];
  constructor() {}

  ngOnInit(): void {
  }

}
