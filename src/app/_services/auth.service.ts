import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Auth } from '../_interfaces/auth';
import { User } from '../_interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.apiUrl + '/auth';
  private currentAuthSource = new BehaviorSubject<Auth | null>(null);
  currentAuth$ = this.currentAuthSource.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Registers a new user.
   * @param model - The registration model.
   * @returns An Observable of type Auth.
   */
  register(model: any) {
    return this.http.post<Auth>(`${this.baseUrl}/register`, model).pipe(
      map((auth: Auth) => {
        if (auth) {
          this.setCurrentAuth(auth);
        }
      })
    );
  }

  /**
   * Logs in a user.
   * @param model - The login model.
   * @returns An Observable of type Auth.
   */
  login(model: any) {
    return this.http.post<Auth>(`${this.baseUrl}/login`, model).pipe(
      map((auth: Auth) => {
        if (auth) {
          this.setCurrentAuth(auth);
        }
      })
    );
  }

  /**
   * Logs out the current user.
   */
  logout() {
    localStorage.removeItem('auth');
    this.currentAuthSource.next(null);
  }

  /**
   * Retrieves the user from local storage.
   * @returns The user object.
   */
  getUser(): User {
    if (!localStorage.getItem('auth')) return {} as User;
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    return auth.user;
  }

  /**
   * Retrieves the user ID from local storage.
   * @returns The user ID.
   */
  getUserId() {
    if (!localStorage.getItem('auth')) return;
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const user = auth.user;
    return user.id;
  }

  /**
   * Retrieves the role from local storage.
   * @returns The user's role.
   */
  getRole() {
    if (!localStorage.getItem('auth')) return;
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth.token;
    const payload = token.split('.')[1];
    const decoded = window.atob(payload);
    const role =
      JSON.parse(decoded)[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];
    return role;
  }

  /**
   * Sets the current authentication information.
   * @param auth - The authentication object.
   */
  setCurrentAuth(auth: Auth) {
    localStorage.setItem('auth', JSON.stringify(auth));
    this.currentAuthSource.next(auth);
  }
}
