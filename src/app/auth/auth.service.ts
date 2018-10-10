import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable()
export class AuthService {
  private _token: string|null;
  tokenChanged = new Subject<string>();

  constructor(private router: Router) {
  }

  get token(): string {
    return this._token;
  }

  initilize(object: Object) {
    firebase.initializeApp(object);
  }
  // On app.component initial check for existing user token
  public authChange_$(): firebase.Unsubscribe {
    return firebase.auth().onAuthStateChanged(
      (user: firebase.User) => {
        if (user) {
          user.getIdToken()
            .then( token => {
              this._token = token;
              this.tokenChanged.next(this._token);
            })
            .catch( error => {
              this._token = null;
              this.tokenChanged.next(this._token);
            });
        } else {
          this._token = null;
          this.tokenChanged.next(this._token);
        }
      }
    );
  }

  signupUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((firebaseUser) => {
        console.log('User ' + firebaseUser.user.uid + ' created successfully!');
        return this.signinUser(email, password);
      });
    // return firebase.auth().createUserWithEmailAndPassword(email, password)
    //   .then((firebaseUser) => {
    //     console.log('User ' + firebaseUser.user.uid + ' created successfully!');
    //     return firebase.auth().signInWithEmailAndPassword(email, password);
    //   })
    //   .then((firebaseUser) => {
    //     console.log('Logged in as:', firebaseUser.user.uid);
    //   });
  }

  signinUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          // this.router.navigate(['/']).then(() => {}, () => {});
          // this.setToken();
          response.user.getIdToken()
            .then( token => {
              this._token = token;
              this.tokenChanged.next(this._token);
            })
            .catch( error => {
              this._token = null;
              this.tokenChanged.next(this._token);
            });
        })
      .catch( error => {
        // console.log(error);
        this._token = null;
        this.tokenChanged.next(this._token);
        return error;
      });
  }

  private setToken() {
    firebase.auth().onAuthStateChanged(
      (user: firebase.User) => {
      if (user) {
        user.getIdToken().then((token: string) => {
          this._token = token;
          this.tokenChanged.next(this._token);
        });
      } else {
        this._token = null;
        this.tokenChanged.next(this._token);
      }
    });
  }
  logout() {
    firebase.auth().signOut()
      .then(() => {
        this._token = null;
        this.tokenChanged.next(this._token);
      });
  }

  getIdToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this._token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

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
