import {Observable} from 'rxjs';

export class AuthInfo {

  constructor(public _uid: string) {}

  isLoggedIn() {
    return !!this._uid;
  }
}
