import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Receipt } from '../_interfaces/receipt';
import { User } from '../_interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = environment.apiUrl + '/user';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves a list of users.
   * @returns An Observable that emits an array of User objects.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  /**
   * Changes the status of a user.
   * @param id - The ID of the user.
   * @returns An Observable that emits a string indicating the status change.
   */
  changeStatus(id: number): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${id}/state`, null, {
      responseType: 'text' as 'json',
    });
  }

  /**
   * Searches for users based on a search term.
   * @param searchTerm - The term to search for.
   * @returns An Observable that emits an array of User objects matching the search term.
   */
  searchUsers(searchTerm: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/search?query=${searchTerm}`);
  }

  /**
   * Edits a user.
   * @param id - The ID of the user to edit.
   * @param model - The data to update the user with.
   * @returns An Observable that emits a string indicating the success of the edit operation.
   */
  editUser(id: number, model: FormData): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${id}`, model, {
      responseType: 'text' as 'json',
    });
  }

  /**
   * Changes the password of a user.
   * @param id - The ID of the user to change the password for.
   * @param model - The new password.
   * @returns An Observable that emits a string indicating the success of the password change.
   */
  changePassword(id: number, model: any): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${id}/password`, model, {
      responseType: 'text' as 'json',
    });
  }

  /**
   * Retrieves a list of purchases made by the user.
   * @returns An Observable that emits an array of Receipt objects.
   */
  getPurchases(): Observable<Receipt[]> {
    return this.http.get<Receipt[]>(`${this.baseUrl}/purchases`, {
      responseType: 'json',
    });
  }
}
