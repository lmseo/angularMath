import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../auth.service';
import {FormValidatorDirective} from '../../shared/form-validator.directive';
import {AuthInfo} from '../auth-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  errorForm = '';
  authInfo: AuthInfo;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnDestroy() {}

  ngOnInit() {
    // this.isLoggedIn = this.authService.tokenChanged;
    this.authService.authInfo$.subscribe(
      authInfo =>  {
      this.authInfo = authInfo;
      console.log(this.authInfo.isLoggedIn());
    });
    this.signInForm = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.email,
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        FormValidatorDirective.strongPassword
      ])
    });
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
  }
  onLogin() {
    const email = this.email.value;
    const password = this.password.value;
    this.authService.login(email, password)
      .subscribe(
        (resp) => {
          // this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          if ( error.code === 'auth/wrong-password') {
            this.errorForm = 'The email or password you have entered is incorrect';
          }
        }
      );
    // this.authService.signinUser( email, password )
    //   .then(response => {
    //     // console.log(error.code);
    //     if ( response.code === 'auth/wrong-password') {
    //       this.errorForm = 'The email or password you have entered is incorrect';
    //     }
    //     this.authService.logout();
    //   });
  }
  get email() {
    return this.signInForm.get('email');
  }
  get password() {
    return this.signInForm.get('password');
  }
}

// {code: "auth/wrong-password", message: "The password is invalid or the user does not have a password."}
