import { FormControl, ValidationErrors} from '@angular/forms';
import { ld } from 'lodash';

export class FormValidatorDirective {

  static matchPassword (control: FormControl): ValidationErrors | null {
    const password = control.get('password');
    const passwordVerify = control.get('passwordVerify');
    // password and passwordVerify has to exist and value diff
    if (password && passwordVerify && (password.value !== passwordVerify.value)) {
      if (passwordVerify.invalid) {
        const errors = Object.assign(passwordVerify.errors,
          { 'passwordDontMatch': true })
        passwordVerify.setErrors(errors);
      } else {
        passwordVerify.setErrors({ 'passwordDontMatch': true }) ;
      }
    //  If passwords values are the same check if other errors present or set error to null
    } else {
      if ( passwordVerify.invalid ) {
        if (passwordVerify.errors.hasOwnProperty('passwordDontMatch')) {
          if ( Object.keys(passwordVerify.errors).length > 1 ) {
            delete passwordVerify.errors.passwordDontMatch;
          } else {
            passwordVerify.setErrors(null );
          }
        }
      }
    }
    return null;
  }
  // 4 step strong password Validator.
  // Strong password must include
  // 1 Number, 1 lower case, 1 upper case and a special character.
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
  public static forbiddenEmails( emails: string[] ) {
    return (control: FormControl) => {
      if (emails.indexOf(control.value) !== -1) {
        return { emailISForbidden: true };
      }
      return null;
    };
  }
}


