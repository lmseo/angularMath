import {Component, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
import {environment} from '../environments/environment';
import {AuthService} from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'noches';
  authUnsub: firebase.Unsubscribe;
  constructor( private authService: AuthService ) {}

  ngOnInit() {
   this.authService.initilize(environment.firebase);
   this.authUnsub = this.authService.authChange_$();
  }

  ngOnDestroy() {
    this.authUnsub();
  }
}
