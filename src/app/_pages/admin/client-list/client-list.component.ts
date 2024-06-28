import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_interfaces/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styles: [],
})
export class ClientListComponent implements OnInit{
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getStatus(status: boolean): string {
    return status ? 'Activo' : 'Inactivo';
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (result) => {
        if (typeof result.error === 'string') {
          console.log(result.error);
        }
      },
    });
  }

  changeStatus(id: number, status: boolean) {
    console.log(id, status.toString());
    this.userService.changeStatus(id, status.toString()).subscribe({
      next: () => {
        this.getUsers();
      },
      error: (result) => {
        if (typeof result.error === 'string') {
          console.log(result.error);
        }
      },
    });
  }
}
