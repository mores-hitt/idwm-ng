import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_interfaces/user';
import {
  AbstractControl,
  FormGroup,
  FormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

/**
 * Represents the Edit Profile component.
 * This component allows users to edit their profile information.
 */
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styles: [],
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup = new FormGroup({});
  id: number = 0;
  errorMessage: string = '';
  user: User = {
    id: 1,
    rut: '',
    name: '',
    birthday: new Date(),
    email: '',
    isActive: true,
    gender: { id: 0, type: '' },
    role: { id: 0, type: '' },
  } as User;
  genderOptions: { value: string; text: string }[] = [
    { value: '1', text: 'Masculino' },
    { value: '2', text: 'Femenino' },
    { value: '3', text: 'Prefiero no decirlo' },
    { value: '4', text: 'Otro' },
  ];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getUser();
    });
    this.initializeForm();
  }

  /**
   * Initializes the edit form with default values and validators.
   */
  initializeForm() {
    this.editForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255),
        ],
      ],
      birthday: ['', [Validators.required, this.validateDate()]],
      genderId: [null, [Validators.required]],
    });
  }

  /**
   * Validates the date format and checks if it is a future date.
   * @returns A validator function that returns an error object if the date is invalid or a future date, otherwise null.
   */
  validateDate(): ValidatorFn {
    return (control: AbstractControl) => {
      const date = control.value;

      if (!date) {
        return null;
      }

      const datePattern =
        /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{2}$/;

      if (!datePattern.test(date)) {
        return { invalidDateFormat: true };
      }

      const [day, month, year] = date.split('/').map(Number);

      const fullYear = 2000 + year;
      const dateObj = new Date(fullYear, month - 1, day);

      const today = new Date();
      if (dateObj >= today) {
        return { futureDate: true };
      }

      return null;
    };
  }

  /**
   * Retrieves the user data from the authentication service and assigns it to the component's user property.
   * Converts the user's birthday string to a Date object.
   */
  getUser() {
    this.user = this.authService.getUser();
    this.user.birthday = new Date(this.user.birthday);
  }

  /**
   * Edits the user's profile.
   * Sends the updated user data to the user service for editing.
   * Navigates to the home page after successful editing.
   * Displays an error message if editing fails.
   */
  editUser() {
    this.userService.editUser(this.id, this.editForm.value).subscribe({
      next: (response) => {
        console.log(response);
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
