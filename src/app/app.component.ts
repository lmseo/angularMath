import {Component, OnDestroy, OnInit} from '@angular/core';

import {AuthService} from './auth/auth.service';
import {AuthInfo} from './auth/auth-info';
import {Unsubscribe} from 'firebase';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'noches';
  authUnsub: Subscription;
  private authInfo: AuthInfo;

  constructor( public authService: AuthService ) {}

  ngOnInit() {
    this.authService.authChange$();
    this.authUnsub = this.authService.authInfo$.subscribe(
        authInfo =>  {
          // console.log(authInfo.isLoggedIn());
        });
  }

  ngOnDestroy() {
    this.authUnsub.unsubscribe();
  }
}
