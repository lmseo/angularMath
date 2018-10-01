import * as firebase from 'firebase/app';
import 'firebase/auth';

export class AuthService {
  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((firebaseUser) => {
        console.log('User ' + firebaseUser.user.uid + ' created successfully!');
        return firebase.auth().signInWithEmailAndPassword(email, password);
      }).then((firebaseUser) => {
      console.log('Logged in as:', firebaseUser.user.uid);
    });
  }
}
