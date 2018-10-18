import {Component, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
import {environment} from '../environments/environment';
import {AuthService} from './auth/auth.service';
import {AuthInfo} from './auth/auth-info';
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

  constructor( private authService: AuthService ) {}

  ngOnInit() {
   // this.authService.initilize(environment.firebase);
   // this.authUnsub = this.authService.authChange_$();
   //  this.authService.authChange$();
    this.authService.authInfo$.subscribe(authInfo =>  {
      console.log(authInfo)
      this.authInfo = authInfo;
      // console.log(this.authInfo);
    });
  }

  ngOnDestroy() {}
}
