import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
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
  MatDialogContent,
} from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-reserve',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatDialogClose,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatDialogContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-reserve.component.html',
  styleUrl: './add-reserve.component.css',
})
export class AddReserveComponent {
  documentTypes: string[] = ['Cédula', 'Pasaporte', 'Rut'];
  genders: string[] = ['Masculino', 'Femenino', 'Otro'];
  form: any;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddReserveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.buildForm(this.data);
  }

  buildForm(data?: any) {
    this.form = this.fb.group({
      fullName: [data.fullName, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      documentType: [data.documentType, Validators.required],
      document: [data.document, Validators.required],
      phone: [data.phone, Validators.required],
      gender: [data.gender, Validators.required],
      birthday: [data.birthday, Validators.required],
      contactPhone: [data.contactPhone, Validators.required],
      contactName: [data.contactPhone, Validators.required],
    });

    if (data.detail) {
      for (var control in this.form.controls) {
        this.form.controls[control].disable();
      }
    }
  }
}
