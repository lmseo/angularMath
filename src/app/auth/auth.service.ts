import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router ) {}

  signupUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((firebaseUser) => {
        console.log('User ' + firebaseUser.user.uid + ' created successfully!');
        return firebase.auth().signInWithEmailAndPassword(email, password);
      })
      .then((firebaseUser) => {
        console.log('Logged in as:', firebaseUser.user.uid);
      });
  }
  signinUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          // this.router.navigate(['/']).then(() => {}, () => {});
          firebase.auth().currentUser.getIdToken()
            .then((token: string) => {
              this.token = token;
            });
        });
  }

  logout() {
    firebase.auth().signOut().then(() => {}, () => {}).catch(() => {});
    this.token = null;
  }

  getIdToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }
  setToken(token) {
    this.token = token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
