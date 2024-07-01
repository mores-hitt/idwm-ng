import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

/**
 * Represents the LoginComponent of the application.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  /**
   * Represents the login form.
   */
  loginForm: FormGroup = new FormGroup({});

  /**
   * Represents the error message.
   */
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  /**
   * Initializes the login form.
   */
  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Initializes the login form with form controls and validators.
   */
  initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  /**
   * Performs the login action.
   * Navigates to the home page on successful login.
   * Sets the error message on login failure.
   */
  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (result) => {
        if (typeof result.error === 'string') {
          this.errorMessage = result.error;
        } else {
          this.errorMessage = 'Intente nuevamente';
        }
      },
    });
  }
}
