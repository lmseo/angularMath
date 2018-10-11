import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PagesComponent } from './pages/pages.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SourceComponent } from './pages/work/source/source.component';
import {AuthGuardService} from './auth-guard.service';
import {WorkModule} from './pages/work/work.module';
import {AuthService} from './auth/auth.service';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    AboutComponent,
    ContactComponent,
    PageNotFoundComponent,
    SourceComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    WorkModule,
    AuthModule,
    CoreModule,
  ],
  providers: [ AuthGuardService, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
