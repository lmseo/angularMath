import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject ,  Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

import {AuthInfo} from './auth-info';

@Injectable()
export class AuthService {
  static UNKNOWN_USER = new AuthInfo(null);
  authInfo$: Subject<AuthInfo> = new Subject<AuthInfo>();

  constructor(private afAuth: AngularFireAuth, private router: Router) {
  }

  // public authChange$(): Observable<AuthInfo> {
  //   return this.fromFirebaseAuthPromise(
  //     new Promise( (resolve, reject) => {
  //       this.afAuth.auth.onAuthStateChanged(function (user) {
  //         if (user) {
  //           resolve(user);
  //         } else {
  //           reject(Error('User is not signed in'));
  //         }
  //       });
  //     })
  //   );
  // }

  public authChange$() {
    return this.afAuth.authState.subscribe((auth) => {
      if (auth) {
        const authInfo = new AuthInfo(auth.uid);
        this.authInfo$.next(authInfo);
      }
    });
  }

  login(email, password): Observable<AuthInfo> {
    return this.fromFirebaseAuthPromise(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
    );
  }

  signUp(email, password): Observable<AuthInfo> {
    return this.fromFirebaseAuthPromise(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    );
  }

  fromFirebaseAuthPromise(promise): Observable<any> {
    const subject = new Subject<any>();
    promise
      .then(res => {
        const authInfo = new AuthInfo(this.afAuth.auth.currentUser.uid);
        this.authInfo$.next(authInfo);
        subject.next(res);
        subject.complete();
        })
      .catch( err => {
        this.authInfo$.next(AuthService.UNKNOWN_USER);
        subject.error(err);
        subject.complete();
      });
    return subject.asObservable();
  }

  logout() {
    this.afAuth.auth.signOut()
      .then( resp => {
        this.authInfo$.next(AuthService.UNKNOWN_USER);
      });
  }
}
