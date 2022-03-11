import * as yup from 'yup';
import { ValidationError } from 'yup';

export const isYupError = (err) => err instanceof ValidationError;

export const formatErrors = (err) => {
  const errorsObject = {};
  err.inner.forEach(({ message, path }) => {
    errorsObject[path] = {
      message,
    };
  });

  return errorsObject;
};

/**
 * @author
 * Owusu K
 *
 * @dependency
 * `yup`
 *
 * Contains methods for validating password and email.
 * Single instance exported as 'check', on which all methods
 * can be called. The instance also extends the string prototype
 * to allow for easier validation.
 *
 * Refer to singleton instance of this class for doc on methods
 */
class InputValidation {
  constructor() {
    this.extendStringPrototype(this);
  }

  requiredSchema = yup.string().required('This field is required');

  emailSchema = yup
    .string()
    .email('Please provide a valid email')
    .required('This field is required');

  comparePasswordSchema = yup
    .string()
    .test('passwords-match', 'Passwords must match', this.comparator);

  passwordSchema = yup
    .string()
    .matches(/^.{6,}$/, 'Password is too short')
    .matches(/(?=.*\d)/, 'Password must contain at least one digit')
    // .matches(/(?=.*[a-z])/, 'Password must contain at least one letter')
    // .matches(/(?=.*[A-Z])/, 'Password must contain at least one Uppercase')
    .required('This field is required');

  parseResult(result) {
    if (typeof result === 'object') {
      return result;
    }
    return null;
  }

  comparator(comparableConcatString) {
    const [item1, item2] = comparableConcatString.split('/');
    return item1 === item2;
  }

  async notEmpty(string, classInstance = this) {
    const result = await classInstance.requiredSchema
      .validate(string)
      .catch((err) => ({ isError: true, message: err.message }));
    return this.parseResult(result);
  }

  async email(email, classInstance = this) {
    const result = await classInstance.emailSchema
      .validate(email)
      .catch((err) => ({ isError: true, message: err.message }));
    return this.parseResult(result);
  }

  async password(password, classInstance = this) {
    const result = await classInstance.passwordSchema
      .validate(password)
      .catch((err) => ({ isError: true, message: err.message }));
    return this.parseResult(result);
  }

  async passwordMatches({ currentPassword, confirmationPassword }, classInstance = this) {
    const result = await classInstance.comparePasswordSchema
      .validate(`${currentPassword}/${confirmationPassword}`)
      .catch((err) => ({ isError: true, message: err.message }));
    return this.parseResult(result);
  }

  extendStringPrototype(classInstance) {
    // eslint-disable-next-line no-extend-native
    String.prototype.isNotEmpty = async function isNotEmpty() {
      const result = await classInstance.notEmpty(this);
      return classInstance.parseResult(result);
    };
    // eslint-disable-next-line no-extend-native
    String.prototype.isEmailValid = async function isEmailValid() {
      const result = await classInstance.email(this);
      return classInstance.parseResult(result);
    };
    // eslint-disable-next-line no-extend-native
    String.prototype.isPasswordValid = async function isPasswordValid() {
      const result = await classInstance.password(this);
      return classInstance.parseResult(result);
    };
    // eslint-disable-next-line no-extend-native
    String.prototype.comparePasswordTo = async function comparePasswordTo(confirmationPassword) {
      const result = await classInstance.passwordMatches({
        currentPassword: this,
        confirmationPassword,
      });
      return classInstance.parseResult(result);
    };
  }

  /**
   * call this function to load string prototype in root module
   * this ensures custom string method is available app wide
   */
  on() {
    console.log('string prototype extended with yup input validators');
  }
}

/**
 * A frozen instance of the InputValidation class
 *
 * @method email - checks if email string passed as params obeys validation rules
 * @method password - checks if password string passed as params obeys validation rules
 * @method passwordMatches - compares two password strings passed as an object are the same.
 * object follows shape of ```{ currentPassword: string, confirmationPassword: string }```
 */
export const check = Object.freeze(new InputValidation());
