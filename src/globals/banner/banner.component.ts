import { Component, OnInit } from '@angular/core';
import { SearchHeroComponent } from '../search-hero/search-hero.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { HotelsService } from '../../hotels/services/hotels.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    SearchHeroComponent,
    MatDatepickerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent implements OnInit {
  myControl = new FormControl('');
  options = [];
  filteredOptions: Observable<string[]> = new Observable();
  form: any;
  today = new Date();
  constructor(private fb: FormBuilder, private router: Router, private hotelsService: HotelsService) {}

  ngOnInit() {
    this.buildForm();
    this.getHotelCities();

  }

  buildForm() {
    this.form = this.fb.group({
      city: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern('[0-9]|1[0-9]|2[0-4]')]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
    this.handleChangeCity();
  }

  handleChangeCity() {
    this.filteredOptions = this.form.controls['city'].valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value || ''))
    );
  }

  getHotelCities() {
    this.hotelsService.getHotelCities().subscribe((cities: any) => {
      this.options = cities;
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option: string) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  search() {
    this.router.navigateByUrl('hotels');
  }
}
