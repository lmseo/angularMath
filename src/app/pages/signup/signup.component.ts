import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../../shared/password-validator.directive';

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
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
        ]),
      'passwordVerify': new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
        ])
    },
      { validators: PasswordValidation.matchPassword});
    this.passwordVerify.statusChanges.subscribe(
      status => {
        if (status) {
          if (this.passwordVerify.valid) {
            console.log(this.passwordVerify.errors);
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
