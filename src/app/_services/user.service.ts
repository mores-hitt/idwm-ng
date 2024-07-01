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

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  changeStatus(id: number): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${id}/state`, null, {
      responseType: 'text' as 'json',
    });
  }

  searchUsers(searchTerm: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseUrl}/search?query=${searchTerm}`
    );
  }

  editUser(id: number, model: FormData): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${id}`, model, {
      responseType: 'text' as 'json',
    });
  }
}
