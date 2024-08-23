import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HotelsService } from '../../../hotels/services/hotels.service';
import { Hotel } from '../../../hotels/hotel.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-romm',
  standalone: true,
  imports: [
    MatDialogClose,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './add-romm.component.html',
  styleUrl: './add-romm.component.css',
})
export class AddRommComponent implements OnInit {
  form: any;
  control = new FormControl('');
  hotels: Hotel[] = [];
  rommTypes: string[] = ['Sencilla', 'Doble', 'Suite'];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddRommComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hotelsService: HotelsService
  ) {}

  ngOnInit(): void {    
    this.loadHotels();
    this.buildForm(this.data);
  }

  loadHotels(): void {
    this.hotelsService.getHotels().then((hotels: Hotel[]) => {
      this.hotels = hotels.filter((hotel: any) => hotel.active);
    });
  }

  get imageField() {
    return this.form.controls['image'];
  }
  get hotelField() {
    return this.form.get('hotel');
  }

  buildForm(data?: any) {    
    this.form = this.fb.group({
      name: [data.name, Validators.required],
      hotel: [data.hotel, Validators.required],
      price: [data.price, Validators.required],
      rommType: [data.rommType, Validators.required],
      tax: [data.tax, Validators.required],
      location: [data.location, Validators.required],
      image: [
        data.image,
        [
          Validators.required,
          Validators.pattern(
            /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)/i
          ),
        ],
      ],
    });
  }

  displayFn(value: any) {
    const hotel: any =
      typeof value !== 'string'
        ? this.hotels.find((hotel: Hotel) => hotel.id === value)
        : { name: value };
    return hotel ? hotel.name : '';
  }
}
