import {Component, OnDestroy, OnInit} from '@angular/core';
import 'firebase/auth';

import {AuthInfo} from '../../auth/auth-info';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  authInfo: AuthInfo;

  constructor( private authService: AuthService) {}

  ngOnInit() {
    // console.log(this.authService.isLoggedIn());
    // this.isLoggedIn = this.authService.isLoggedIn();
    // this.isLoggedIn = this.authService.tokenChanged;
    this.authService.authInfo$.subscribe(authInfo =>  {
      this.authInfo = authInfo;
      // console.log(this.authInfo);

    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {}
}
