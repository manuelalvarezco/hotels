import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalFireService {
  constructor() {}

  successMessage(title: string, text: string) {
    Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

  confirmActionMessage(title: string, confirmButtonText: string) {
    return new Promise((resolve, reject) => {
      resolve(
        Swal.fire({
          title,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: this.capitalize(confirmButtonText),
          cancelButtonText: 'Cancelar',
        })
      );
    });
  }

  capitalize(text: string ) {
    return text && text[0].toUpperCase() + text.slice(1);
  }
}
