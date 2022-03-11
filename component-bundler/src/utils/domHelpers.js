/**
 * Blocks thread in an async stack
 *
 * @param {number} ms
 * @returns
 */
function asyncSleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Converts rgb values to hex
 *
 * @param {string} r
 * @param {string} g
 * @param {string} b
 * @returns
 */
function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b]
      .map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

/**
 * Converst a hex string to rgb array
 *
 * @param {string} hex
 * @returns
 */
function hexToRgb(hex) {
  return hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => '#' + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map(x => parseInt(x, 16));
}

/**
 * Checks if a prop is a function before calling it
 *
 * @param {any} callback
 */
function assertFnProp(callback) {
  if (typeof callback === 'function') {
    return true;
  } else {
    // console.warn(
    //   'The provided object is not a Function!\nThis is expected behaviour in storybook dev mode.\nHowever if you are consuming the package then please check you callback props'
    // );
    throw Error(
      'Please provide a function handler for this event.\nIts likely you have forgotten to add the [onClick|onChange...etc] prop'
    );
    // return false;
  }
}

/**
 * Unique HTML id generator.
 *
 * Only use internally to allow for easy tracking of components tagged with these ids.
 * However if this ever get used outside this library then always provide a prefix.
 *
 * @param {string} prefix
 * @returns String
 */
function uniqueIdGen(prefix = undefined) {
  let uniqueId = prefix ? prefix.toString() : 'hiram-labs-sb-int-';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i++) {
    uniqueId += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  uniqueId += `${parseInt(Math.pow(2, 32) * Math.random(), 10).toString(16)}-`;
  uniqueId += `${Date.now().toString(16)}-rand`;

  return uniqueId;
}

/**
 * Returns the dimensions of the screen;
 */
function getScreenDimension() {
  if (typeof document === 'undefined') return {height: 0, width: 0};

  return {
    width:
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
    height:
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight,
  };
}

/**
 * Similar to jQuery $ and also handles cases where the `#` or `.` prefix is missing for selector
 *
 * @param {string} elementRef
 * @returns HTMLElement
 */
function getElement(elementRef) {
  const selectors = {
    callerSupplied: undefined,
    className: '.',
    id: '#',
  };
  if (typeof document === 'undefined' || !elementRef) return undefined;
  if (typeof elementRef === 'object') return elementRef;

  const element = Object.values(selectors)
    .map(
      selector =>
        document?.querySelector(`${selector || ''}${elementRef}`) &&
        document?.querySelector(`${selector || ''}${elementRef}`)
    )
    .filter(items => !!items)[0];

  return element;
}

/**
 * Gets element position and dimension like `getBoundingClientRect()`
 *
 * @param {string} elementRef
 * @returns DataObject
 */
function getElementPosition(elementRef) {
  const position = {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: 0,
    height: 0,
  };

  const element = getElement(elementRef);
  if (!element) return position;
  try {
    const results = element.getBoundingClientRect();

    position.top = results.top;
    position.bottom = results.bottom;
    position.right = results.right;
    position.left = results.left;
    position.width = results.width;
    position.height = results.height;

    return position;
  } catch (error) {
    console.warn('Invalid element provided');
    return position;
  }
}

/**
 * Gives data about a child relative to a parent element.
 * Data includes position and dimensions
 *
 * @param {string} parentRef
 * @param {string} childRef
 * @returns DataObject
 */
function getChildPositionRelativeToParent(parentRef, childRef) {
  const position = {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    parentWidth: 0,
    parentHeight: 0,
    childWidth: 0,
    childHeight: 0,
  };

  const parentElem = getElement(parentRef);
  const childElem = getElement(childRef);
  if (!parentElem || !childElem) return position;

  const {
    top: parentTop,
    bottom: parentBottom,
    right: parentRight,
    left: parentLeft,
    height: parentHeight,
    width: parentWidth,
  } = parentElem?.getBoundingClientRect() || {};
  const {
    top: childTop,
    bottom: childBottom,
    right: childRight,
    left: childLeft,
    height: childHeight,
    width: childWidth,
  } = childElem?.getBoundingClientRect() || {};

  position.top = Math.abs(childTop - parentTop);
  position.bottom = Math.abs(childBottom - parentBottom);
  position.right = Math.abs(childRight - parentRight);
  position.left = Math.abs(childLeft - parentLeft);
  position.parentWidth = parentWidth;
  position.parentHeight = parentHeight;
  position.childWidth = childWidth;
  position.childHeight = childHeight;

  return position;
}

/**
 * converts the keys of as camelCased and
 * returns the new object
 *
 * @param {object} obj
 * @returns object
 */
function keyToCamel(obj) {
  const proxy = {};
  for (const k in obj) {
    const camelize = k.replace(/-./g, x => x.toUpperCase()[1]);
    proxy[camelize] = obj[k];
  }
  return proxy;
}

module.exports = {
  asyncSleep,
  rgbToHex,
  hexToRgb,
  assertFnProp,
  uniqueIdGen,
  getScreenDimension,
  getElement,
  getChildPositionRelativeToParent,
  getElementPosition,
  keyToCamel,
};
