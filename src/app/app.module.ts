import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { PagesComponent } from './pages/pages.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import {AppRoutingModule} from './app-routing.module';
import { SourceComponent } from './pages/work/source/source.component';
import {AuthGuardService} from './auth-guard.service';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import {WorkModule} from './pages/work/work.module';
import {AuthService} from './auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PagesComponent,
    AboutComponent,
    ContactComponent,
    PageNotFoundComponent,
    SourceComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    WorkModule,
    AppRoutingModule,
  ],
  providers: [ AuthGuardService, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
