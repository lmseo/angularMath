/** A password have to match */
import { FormControl, ValidationErrors} from '@angular/forms';
import { ld } from 'lodash';

export interface ValidationResult {
  [key: string]: boolean;
}

export class PasswordValidation {

  static matchPassword (control: FormControl): ValidationErrors | null {
    const password = control.get('password');
    const passwordVerify = control.get('passwordVerify');
    const passwordVerifyErrors = passwordVerify.errors;

    if  (password && passwordVerify && (password.value !== passwordVerify.value)) {
      if (passwordVerifyErrors) {
        const errors = Object.assign(passwordVerifyErrors, { 'passwordDontMatch': true })
        passwordVerify.setErrors(errors);
      } else {
        passwordVerify.setErrors({ 'passwordDontMatch': true }) ;
      }

    } else {
      // passwordVerify.setErrors(null );
      // console.log(passwordVerify.errors);

    }
    return null;
  }
  public static strongPassword(control: FormControl): ValidationResult {
    const hasNumber = /\d/.test(control.value);
    const hasUpper = /[A-Z]/.test(control.value);
    const hasLower = /[a-z]/.test(control.value);
    // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
    const valid = hasNumber && hasUpper && hasLower;
    if (!valid) {
      // return what´s not valid
      return { strong: true };
    }
    return null;
  }
}


