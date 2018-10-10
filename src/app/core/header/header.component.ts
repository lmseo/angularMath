import {Component, OnDestroy, OnInit} from '@angular/core';

import {AuthService} from '../../auth/auth.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  token = '';
  isLoggedIn = null;
   subscription;

  constructor( private authService: AuthService) {}

  ngOnInit() {
    // console.log(this.authService.isLoggedIn());
    // this.isLoggedIn = this.authService.isLoggedIn();
    this.isLoggedIn = this.authService.tokenChanged;
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
