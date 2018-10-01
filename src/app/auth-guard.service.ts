import {
  ActivatedRouteSnapshot,
  CanActivate, CanActivateChild, Router,
  RouterStateSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
// import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor( // private authService: AuthService,
               private router: Router) {}

  canActivate( route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    // return this.authService.isAuthenticated()
    //   .then( (authenticated: boolean) => {
    //     if (authenticated) {
    //       return true;
    //     } else {
    //       this.router.navigate(['/login']);
    //     }
    //   }, ( err ) => {
    //     console.log(err);
    //     return false;
    //   });
    return false;
  }
  canActivateChild( route: ActivatedRouteSnapshot,
                    state: RouterStateSnapshot) {
    return this.canActivate( route, state );
  }
}
