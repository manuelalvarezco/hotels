import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../users/services/users.service';
import { User } from '../../../users/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();    
  }

  loadUsers() {
    this.usersService.getUsers()
      .then((users: User[]) => {
        this.users = users;        
      })
  }
}
