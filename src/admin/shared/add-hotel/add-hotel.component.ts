import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { LocationsService } from '../../../locations/services/locations.service';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-hotel',
  standalone: true,
  imports: [
    MatDialogClose,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    AsyncPipe,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  templateUrl: './add-hotel.component.html',
  styleUrl: './add-hotel.component.css',
})
export class AddHotelComponent implements OnInit {
  form: any;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddHotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private locationsService: LocationsService
  ) {}

  ngOnInit(): void {
    this.getCountries();
    this.buildForm(this.data);
  }

  getCountries() {
    this.locationsService.getCountries().subscribe((countries: any) => {
      this.countries = countries;
    }, err => {
      console.log(err);
    });
  }

  getStates(country: string) {
    this.locationsService.getStates(country).subscribe((states: any) => {
      this.states = states;
    });
  }
  getCities(state: string) {
    this.locationsService.getCities(state).subscribe((cities: any) => {
      this.cities = cities;
    });
  }

  get countryField() {
    return this.form.controls['country'];
  }
  get stateField() {
    return this.form.controls['state'];
  }
  get imageField() {
    return this.form.controls['image'];
  }

  buildForm(data?: any) {
    this.data.name?.length ? this.editForm() : this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      price: ['', Validators.required],
      image: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)/i
          ),
        ],
      ],
    });
  }

  editForm() {
    this.selectCountry({ value: this.data.country});
    this.selectState({ value: this.data.state});
    this.form = this.fb.group({
      name: [this.data.name, Validators.required],
      country: [this.data.country, Validators.required],
      state: [this.data.state, Validators.required],
      city: [this.data.city, Validators.required],
      price: [this.data.price, Validators.required],
      image: [
        this.data.image,
        [
          Validators.required,
          Validators.pattern(
            /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)/i
          ),
        ],
      ],
    });
  }

  selectCountry(event: any) {
    const country = event.value;
    country ? this.getStates(country) : null;
  }

  selectState(event: any) {
    const state = event.value;
    state ? this.getCities(state) : null;
  }
}
