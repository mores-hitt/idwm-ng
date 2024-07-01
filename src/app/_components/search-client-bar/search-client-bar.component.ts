import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

/**
 * Component for the search client bar.
 */
@Component({
  selector: 'app-search-client-bar',
  templateUrl: './search-client-bar.component.html',
  styles: [],
})
export class SearchClientBarComponent {
  /**
   * The search query entered by the user.
   */
  query: string = '';

  /**
   * Event emitter for search results.
   */
  @Output() searchResults = new EventEmitter<any>();

  constructor(private userService: UserService) {}

  /**
   * Performs a search for users based on the query.
   * If the query is empty, retrieves all users.
   */
  searchUsers() {
    if (this.query === '') {
      this.userService.getUsers().subscribe({
        next: (response) => {
          this.searchResults.emit(response);
          console.log(response);
        },
        error: (result) => {
          if (typeof result.error === 'string') {
            console.log(result.error);
          }
        },
      });
      return;
    }
    this.userService.searchUsers(this.query).subscribe({
      next: (response) => {
        this.searchResults.emit(response);
        console.log(response);
      },
      error: (result) => {
        if (typeof result.error === 'string') {
          console.log(result.error);
        }
      },
    });
  }
}
