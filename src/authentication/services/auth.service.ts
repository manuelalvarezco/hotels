import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CreateUserDTO, User } from '../../users/user.interface';
import { TokenService } from './token.service';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api';
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  login(data: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`,{email: data.email, password: data.password} )
      .pipe(
        tap((response: any) => this.tokenService.saveToken(response.access_token)),
        catchError((error: any) => {          
          throw new Error(error)
        })
      )
  }

  logout() {
    localStorage.removeItem('token');
    return of(true);
  }


  register(user: CreateUserDTO){
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  grantedAccess(){
    Swal.fire({
      title: 'Perfecto!',
      text: 'Ingreso exitoso!',
      icon: 'success',
      confirmButtonText: 'OK'
    })
  }

  accessDenied(module: string){
    Swal.fire({
      title: 'Error!',
      text: `Error en el acceso!`,
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }
}
