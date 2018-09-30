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
  public static strongPassword(control: FormControl): ValidationErrors {
    const hasError = {
      hasNumberError: true,
      hasUpperCharError: true,
      hasLowerCharError: true,
      hasSpecCharError: true
    };
    const hasNumber = /\d/.test(control.value);
    const hasUpper = /[A-Z]/.test(control.value);
    const hasLower = /[a-z]/.test(control.value);
    const hasSpecChar = /[^a-zA-Z ]+/.test(control.value);
    const valid = hasNumber || hasUpper || hasLower || hasSpecChar;
    // Checking for 1 number
    !hasNumber ? hasError.hasNumberError = true : delete hasError.hasNumberError;
    // Checking for 1 Upper case char
    !hasUpper ? hasError.hasUpperCharError = true : delete hasError.hasUpperCharError;
    // Checking for 1 lower case char
    !hasLower ? hasError.hasLowerCharError = true : delete hasError.hasLowerCharError;
    // Checking for 1 special char
    !hasSpecChar ? hasError.hasSpecCharError = true : delete hasError.hasSpecCharError;
    if (valid) {
      // return what´s not valid
      return hasError;
    }
    return null;
  }
}


