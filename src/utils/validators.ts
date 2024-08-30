import { AbstractControl } from '@angular/forms';
import moment from 'moment';

export class MyValidators {
  static greaterAge(control: AbstractControl) {
    const date = moment(control.value).format('YYYY-MM-DD');
    const age = moment().diff(date, 'years');
    return !isNaN(age) && age < 18 ? { invalid_age: true } : true;

  }
}
