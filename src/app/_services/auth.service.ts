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

  register(model: any) {
    return this.http.post<Auth>(`${this.baseUrl}/register`, model).pipe(
      map((auth: Auth) => {
        if (auth) {
          this.setCurrentAuth(auth);
        }
      })
    );
  }

  login(model: any) {
    return this.http.post<Auth>(`${this.baseUrl}/login`, model).pipe(
      map((auth: Auth) => {
        if (auth) {
          this.setCurrentAuth(auth);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('auth');
    this.currentAuthSource.next(null);
  }

  getUser(): User {
    if (!localStorage.getItem('auth'))
      return {} as User;
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    return auth.user;
  }

  getUserId() {
    if (!localStorage.getItem('auth'))
      return;
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const user = auth.user;
    return user.id;
  }

  getRole() {
    if (!localStorage.getItem('auth')) return;
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth.token;
    const payload = token.split('.')[1];
    const decoded = window.atob(payload);
    const role = JSON.parse(decoded)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return role;
  }

  setCurrentAuth(auth: Auth) {
    localStorage.setItem('auth', JSON.stringify(auth));
    this.currentAuthSource.next(auth);
  }
}
