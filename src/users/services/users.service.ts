import { Injectable } from '@angular/core';
import { User } from '../user.interface';
import { LocalStorageService } from '../../globals/services/local-storage.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users = [
    {
      id: 1,
      fullName: 'admin',
      birthday: '',
      gender: 'Masculino',
      documentType: 'Cédula',
      document: '12312456456',
      phone: '13113453',
      email: 'admin@admin.com',
      password: '123456789',
      contactPhone: '6565656',
      contactName: '35454566',
      active: true,
    }
  ];

  constructor(private localStorageService: LocalStorageService) { }

  getUsers(): Promise<User[]> {
    const localUsers = this.localStorageService.getData('users');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = localUsers ? JSON.parse(localUsers) : this.users;
        resolve(users);
      }, 500);
    })
  }
  getUserById(id: number) {
    const localUsers = this.localStorageService.getData('users');
    const response = localUsers ? JSON.parse(localUsers) : this.users;
    const user = response.find((user: any) => user.id === id);    
    return user;
  }
  getUserByEmail(email: string, password: string) {
    const localUsers = this.localStorageService.getData('users');
    const response = localUsers ? JSON.parse(localUsers) : this.users;
    const user = response.find((user: any) => user.email === email && user.password === password);    
    return user;
  }

  addUser(user: User) {
    const localUsers = this.localStorageService.getData('users');
    const users = localUsers ? JSON.parse(localUsers) : this.users;
    users.push({
      ...user,
      active: true,
      password: '123456789',
      id: users.length + 1,
    });
    this.localStorageService.saveData('users', JSON.stringify(users));
    const respose: any = this.localStorageService.getData('users');

    return of(users[users.length - 1]);
  }

  
}
