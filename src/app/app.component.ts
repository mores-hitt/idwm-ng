import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AuthService } from './_services/auth.service';
import { Auth } from './_interfaces/auth';

/**
 * The root component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  /**
   * The title of the application.
   */
  title = 'web-app';

  constructor(private authService: AuthService) {}

  /**
   * Lifecycle hook that is called after the component has been initialized.
   */
  ngOnInit(): void {
    initFlowbite();
    this.setCurrentAuth();
  }

  /**
   * Sets the current authentication information based on the value stored in local storage.
   */
  setCurrentAuth() {
    const authString = localStorage.getItem('auth');
    if (!authString) return;
    const auth: Auth = JSON.parse(authString);
    this.authService.setCurrentAuth(auth);
  }
}
