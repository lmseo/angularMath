import { Router } from '@angular/router';
import {Injectable, OnInit} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject, Observable} from 'rxjs';

// import * as firebase from 'firebase/app';
// import 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/auth';

import {AuthInfo} from './auth-info';



@Injectable()
export class AuthService {
  static UNKNOWN_USER = new AuthInfo(null);
  // authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(
  //   AuthService.UNKNOWN_USER
  // );
  authInfo$: Subject<AuthInfo> = new Subject<AuthInfo>();

  constructor(private afAuth: AngularFireAuth, private router: Router) {}


  public authChange$(): Observable<AuthInfo> {
    return this.fromFirebaseAuthPromise(
      new Promise( (resolve, reject) => {
        this.afAuth.auth.onAuthStateChanged(function (user) {
          if (user) {
            resolve(user);
          } else {
            reject(Error('User is not signed in'));
          }
        });
      })
    );
  }
  // public get authInfo$(): BehaviorSubject<AuthInfo> {
  //   return this._authInfo$;
  // }

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
          console.log(this.authInfo$);
          subject.next(res);
          subject.complete();
        },
        err => {
          this.authInfo$.error(err);
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
  // With Observables
  //
  //
  // private _token: string|null;
  // tokenChanged = new Subject<string>();
  //
  // constructor(private router: Router) {
  // }
  //
  // get token(): string {
  //   return this._token;
  // }
  //
  // initilize(object: Object) {
  //   firebase.initializeApp(object);
  // }
  // // On app.component initial check for existing user token
  // public authChange_$(): firebase.Unsubscribe {
  //   return firebase.auth().onAuthStateChanged(
  //     (user: firebase.User) => {
  //       if (user) {
  //         user.getIdToken()
  //           .then( token => {
  //             this._token = token;
  //             this.tokenChanged.next(this._token);
  //           })
  //           .catch( error => {
  //             this._token = null;
  //             this.tokenChanged.next(this._token);
  //           });
  //       } else {
  //         this._token = null;
  //         this.tokenChanged.next(this._token);
  //       }
  //     }
  //   );
  // }
  //
  // signupUser(email: string, password: string) {
  //   return firebase.auth().createUserWithEmailAndPassword(email, password)
  //     .then((firebaseUser) => {
  //       console.log('User ' + firebaseUser.user.uid + ' created successfully!');
  //       return this.signinUser(email, password);
  //     });
  //   // return firebase.auth().createUserWithEmailAndPassword(email, password)
  //   //   .then((firebaseUser) => {
  //   //     console.log('User ' + firebaseUser.user.uid + ' created successfully!');
  //   //     return firebase.auth().signInWithEmailAndPassword(email, password);
  //   //   })
  //   //   .then((firebaseUser) => {
  //   //     console.log('Logged in as:', firebaseUser.user.uid);
  //   //   });
  // }
  //
  // signinUser(email: string, password: string) {
  //   return firebase.auth().signInWithEmailAndPassword(email, password)
  //     .then(
  //       response => {
  //         // this.router.navigate(['/']).then(() => {}, () => {});
  //         // this.setToken();
  //         response.user.getIdToken()
  //           .then( token => {
  //             this._token = token;
  //             this.tokenChanged.next(this._token);
  //           })
  //           .catch( error => {
  //             this._token = null;
  //             this.tokenChanged.next(this._token);
  //           });
  //       })
  //     .catch( error => {
  //       // console.log(error);
  //       this._token = null;
  //       this.tokenChanged.next(this._token);
  //       return error;
  //     });
  // }
  //
  // private setToken() {
  //   firebase.auth().onAuthStateChanged(
  //     (user: firebase.User) => {
  //     if (user) {
  //       user.getIdToken().then((token: string) => {
  //         this._token = token;
  //         this.tokenChanged.next(this._token);
  //       });
  //     } else {
  //       this._token = null;
  //       this.tokenChanged.next(this._token);
  //     }
  //   });
  // }
  // logout() {
  //   firebase.auth().signOut()
  //     .then(() => {
  //       this._token = null;
  //       this.tokenChanged.next(this._token);
  //     });
  // }
  //
  // getIdToken() {
  //   firebase.auth().currentUser.getIdToken()
  //     .then(
  //       (token: string) => this._token = token
  //     );
  //   return this.token;
  // }
  //
  // isAuthenticated() {
  //   return new Promise((resolve, reject) => {
  //     firebase.auth().onAuthStateChanged(user => {
  //       if (user) {
  //         resolve(true);
  //       } else {
  //         resolve(false);
  //       }
  //     });
  //   });
  // }
  // Without Observables
  //
  //
  //
  // private getToken(): Promise<string> {
  //   const user = firebase.auth().currentUser;
  //
  //   return user.getIdToken()
  //     .then((token: string) => {
  //       this._token = token;
  //       return token;
  //     })
  //     .catch(error => {
  //       return null;
  //     });
  // }

  // signinUser(email: string, password: string) {
  //   return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  //     .then(() => {
  //       return firebase.auth().signInWithEmailAndPassword(email, password)
  //         .then(
  //           response => {
  //             // this.router.navigate(['/']).then(() => {}, () => {});
  //             firebase.auth().currentUser.getIdToken()
  //               .then((token: string) => {
  //                 this.token = token;
  //               });
  //           });
  //     });
  // }
  //
  // logout() {
  //   return firebase.auth().signOut();
  // }
  //
  // getIdToken() {
  //   firebase.auth().currentUser.getIdToken()
  //     .then(
  //       (token: string) => this.token = token
  //     );
  //   return this.token;
  // }
  // setToken(token) {
  //   this.token = token;
  // }
  //
  // isAuthenticated() {
  //   return this.token != null;
  // }
  // isLoggedIn() {
  //   return new Promise((resolve, reject) => {
  //     firebase.auth().onAuthStateChanged(user => {
  //       if (user) {
  //        resolve(true);
  //       } else {
  //         resolve(false);
  //       }
  //     });
  //   });
  // }
}
