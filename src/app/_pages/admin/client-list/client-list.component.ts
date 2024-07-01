import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_interfaces/user';
import { UserService } from 'src/app/_services/user.service';

/**
 * Represents the component for displaying a list of clients.
 */
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styles: [],
})
export class ClientListComponent implements OnInit {
  /**
   * The list of users.
   */
  users: User[] = [];

  /**
   * Creates an instance of ClientListComponent.
   * @param userService The user service.
   */
  constructor(private userService: UserService) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.getUsers();
  }

  /**
   * Gets the status label based on the given status.
   * @param status The status value.
   * @returns The status label.
   */
  getStatus(status: boolean): string {
    return status ? 'Activo' : 'Inactivo';
  }

  /**
   * Retrieves the list of users from the server.
   */
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

  /**
   * Changes the status of a user with the given ID.
   * @param id The ID of the user.
   */
  changeStatus(id: number) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        user.isActive = !user.isActive;
      }
      return user;
    }, this.users);
    this.userService.changeStatus(id).subscribe({
      next: () => {
        this.getUsers();
      },
      error: (result) => {
        if (typeof result.error === 'string') {
          console.log(result.error);
        }
        console.log(result);
      },
    });
  }

  /**
   * Performs a search based on the given event.
   * @param event The search event.
   */
  search(event: any) {
    this.users = event;
  }
}
