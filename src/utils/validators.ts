import { AbstractControl } from '@angular/forms';
import { differenceInYears, format } from 'date-fns';

export class MyValidators {
  static greaterAge(control: AbstractControl) {
    if (control.value) {
      const date = format(new Date(control.value), 'MM/dd/yyyy');
      const age = differenceInYears(Date.now(), date);
      return !isNaN(age) && age < 18 ? { invalid_age: true } : true;
    } else {
      return { invalid_age: true };
    }
  }
}
