import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';


import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {AuthRouterModule} from './auth-router.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRouterModule
  ]
})
export class AuthModule {}
