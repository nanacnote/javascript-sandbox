const yup = require('yup');

/**
 * @author
 * Owusu K
 *
 * @dependency
 * `yup`
 *
 * Contains methods for validating password and email.
 * Single instance exported, on which all methods
 * can be called.
 *
 * Refer to singleton instance of this class for doc on methods
 */
class InputValidation {
  _parseResult(result) {
    if (typeof result === 'object') {
      return result;
    }
    return null;
  }

  _comparator(comparableConcatString) {
    const [item1, item2] = comparableConcatString.split('/');
    return item1 === item2;
  }

  /**
   * checks if email string passed as params obeys validation rules
   *
   * @param {*} optionsObject
   * @returns {*} ErrorObject
   */
  async email({inputStr, isRequiredMsg, errorMsg}) {
    const result = await yup
      .string()
      .email(errorMsg || null)
      .required(isRequiredMsg || errorMsg || null)
      .validate(inputStr)
      .catch(err => ({isError: true, message: err.message}));
    return this._parseResult(result);
  }

  /**
   * checks if password string passed as params obeys validation rules
   *
   * @param {*} optionsObject
   * @returns {*} ErrorObject
   */
  async password({inputStr, isRequiredMsg, errorMsg}) {
    const result = await yup
      .string()
      .matches(/^.{8,}$/, errorMsg || null) //'Password must be 8 char long'
      .matches(/(?=.*\d)/, errorMsg || null) //'Password must contain at least one digit'
      .matches(/(?=.*[a-z])/, errorMsg || null) // 'Password must contain at least one letter'
      .matches(/(?=.*[A-Z])/, errorMsg || null) // 'Password must contain at least one Uppercase'
      .required(isRequiredMsg || errorMsg || null)
      .validate(inputStr)
      .catch(err => ({isError: true, message: err.message}));
    return this._parseResult(result);
  }

  /**
   * compares two strings passed are the same.
   * object follows shape of ```{ inputStr: string, testStr: string }```
   *
   * @param {*} optionsObject
   * @returns {*} ErrorObject
   */
  async assertEquals({inputStr, testStr, errorMsg}) {
    const result = await yup
      .string()
      .test('passwords-match', errorMsg, this._comparator)
      .validate(`${inputStr}/${testStr}`)
      .catch(err => ({isError: true, message: err.message}));
    return this._parseResult(result);
  }

  /**
   * Matches the str provided against the regex provided for custom cases
   * Also enforces is required rule
   *
   * @param {*} optionsObject
   * @returns {*} ErrorObject
   */
  async matchRegexRequired({inputStr, pattern, isRequiredMsg, errorMsg}) {
    const regex = new RegExp(pattern);
    const resultWithPattern = await yup
      .string()
      .matches(regex, errorMsg || null)
      .required(isRequiredMsg || errorMsg || null)
      .validate(inputStr)
      .catch(err => ({isError: true, message: err.message}));
    const resultWithoutPattern = await yup
      .string()
      .matches(/^.{3,}$/, errorMsg || null) //'string must be at least 3 characters'
      .required(isRequiredMsg || errorMsg || null)
      .validate(inputStr)
      .catch(err => ({isError: true, message: err.message}));
    return this._parseResult(
      pattern ? resultWithPattern : resultWithoutPattern
    );
  }
}

/**
 * A frozen instance of the InputValidation class
 * All methods are promise based so `await` or `then` should be used
 *
 * @method email - checks if email string passed as params obeys validation rules
 * @method password - checks if password string passed as params obeys validation rules
 * @method assertEquals - compares two strings passed are the same.
 * object follows shape of ```{ inputStr: string, testStr: string }```
 * @method matchRegexRequired Matches the str provided against the regex provided for custom cases
 * Also enforces is required rule
 *
 * All methods return null on a valid check and an error object if invalid check.
 * Error object is of shape ```{isError: boolean, message: string}```
 *
 * @example
 * import {check} from "@utils/yupHelpers"
 *
 * check.email("hello@email.com").then(results => console.log(results))
 */
const check = Object.freeze(new InputValidation());

module.exports = check;
