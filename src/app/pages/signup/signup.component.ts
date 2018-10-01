import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../../shared/password-validator.directive';
import {type} from 'os';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userName': new FormControl('',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.email
        ]),
      'password': new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
          PasswordValidation.strongPassword
        ]),
      'passwordVerify': new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
        ])
    },
      { validators: PasswordValidation.matchPassword});
    this.password.statusChanges.subscribe(
      status => {
        if (status) {
          if (this.password.invalid) {
            // Find last error and add property last: true to hide hl
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
  onSubmit() {
    console.log(this.signupForm);
  }
  get userName() {
    return this.signupForm.get('userName');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get passwordVerify() {
    return this.signupForm.get('passwordVerify');
  }
}
