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
/**
 * Component for changing the user's password.
 */
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styles: [],
})
export class ChangePasswordComponent implements OnInit {
  editForm: FormGroup = new FormGroup({});
  id: number = 0;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
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
    });
    this.initializeForm();
  }

  /**
   * Initializes the form with the necessary form controls and validators.
   */
  initializeForm() {
    this.editForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      confirmNewPassword: [
        '',
        [Validators.required, this.matchValues('newPassword')],
      ],
    });

    this.editForm.controls['newPassword'].valueChanges.subscribe({
      next: () =>
        this.editForm.controls['confirmNewPassword'].updateValueAndValidity(),
    });
  }

  /**
   * Custom validator function to check if the value of a control matches another control's value.
   * @param matchTo The name of the control to match against.
   * @returns A validator function that returns an error object if the values do not match, or null if they match.
   */
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value
        ? null
        : { noMatching: true };
    };
  }

  /**
   * Handles the change password action.
   */
  changePassword() {
    this.userService.changePassword(this.id, this.editForm.value).subscribe({
      next: (response) => {
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
