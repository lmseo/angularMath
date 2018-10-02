import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidatorDirective } from '../../shared/form-validator.directive';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  forbiddenEmails = [];

  constructor( private authService: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'email': new FormControl('',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.email,
          FormValidatorDirective.forbiddenEmails(this.forbiddenEmails)
        ]),
      'password': new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
          FormValidatorDirective.strongPassword
        ]),
      'passwordVerify': new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
        ])
    },
      { validators: FormValidatorDirective.matchPassword});
    //
    //
    // Find last error on error obj and add property last: true to hide hl HTML el
    this.password.statusChanges.subscribe(
      status => {
        if (status) {
          if (this.password.invalid) {
            const lastError =
              Object.keys(this.password.errors)[Object.keys(this.password.errors).length - 1 ];
            if (typeof this.password.errors[lastError] === 'object') {
              this.password.errors[lastError].last = true;
            } else {
              this.password.errors[lastError] = { last: true };
            }
          }
        }
      });
    // Find last error on error obj and add property last: true to hide hl HTML el
    this.passwordVerify.statusChanges.subscribe(
      status => {
        if (status) {
          if (this.passwordVerify.invalid) {
            // Find last error and add property last: true to hide hl
            for ( const err in this.passwordVerify.errors) {
              if (typeof this.passwordVerify.errors[err] === 'object') {
                if (typeof this.passwordVerify.errors[err].last !== 'undefined') {
                  delete this.passwordVerify.errors[err].last;
                }
              }
            }
            const lastError =
              Object.keys(this.passwordVerify.errors)[Object.keys(this.passwordVerify.errors).length - 1 ];
            if (typeof this.passwordVerify.errors[lastError] === 'object') {
              this.passwordVerify.errors[lastError].last = true;
            } else {
              this.passwordVerify.errors[lastError] = { last: true };
            }
          }
        }
      });
  }
  // When the form gets submitted
  onSubmit() {
    const email = this.email.value;
    const password = this.password.value;
    this.authService.signupUser(email, password)
      .catch( error => {
        if ( error.code === 'auth/email-already-in-use' ) {
          this.forbiddenEmails.push(this.email.value);
          if (this.email.invalid) {
            const errors = Object.assign(this.email.errors,
              { emailISForbidden: true })
            this.email.setErrors(errors);
          } else {
            this.email.setErrors({ emailISForbidden: true }) ;
          }
        }
      });
  }
  // Use getters for cleaner HTML code
  // Getter for this.userName
  get email() {
    return this.signupForm.get('email');
  }
  // Getter for this.password
  get password() {
    return this.signupForm.get('password');
  }
  // Getter for this.passwordVerify
  get passwordVerify() {
    return this.signupForm.get('passwordVerify');
  }
}
// {code: "auth/email-already-in-use", message: "The email address is already in use by another account."}
