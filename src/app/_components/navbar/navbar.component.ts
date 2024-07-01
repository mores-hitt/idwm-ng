import { Component } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

/**
 * Represents the NavbarComponent class that is responsible for rendering the navigation bar.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}
}
