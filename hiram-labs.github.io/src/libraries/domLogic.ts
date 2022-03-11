/**
 * Sets the styles on an element or html collection using options object passed as a parameter
 * There is an optional exceptions option which takes array values for exception instances in
 * HTMLCollections. The array entries must be shaped as stringed key: value semi colon separated
 *
 * @param options options to set style if multiple properties are require put them in
 *  an array with index of each property matching its values index
 */
export const styleAttributeEditor = (options: {
  element: HTMLCollection | HTMLElement | Element | null | undefined;
  style: string;
  exception?: { [key: number]: string[] }[];
}) => {
  let value: Array<string> = [];

  // HTMLElement logic
  if (
    options.element &&
    options.element.constructor.name !== 'HTMLCollection'
  ) {
    value.push(options.style);
    value = [value.join('; ')];
    (options.element as HTMLElement | Element).setAttribute('style', value[0]);
  }

  // HTMLCollection logic
  if (
    options.element &&
    options.element.constructor.name === 'HTMLCollection'
  ) {
    for (let i = 0; i < (options.element as HTMLCollection).length; i++) {
      if (options.exception) {
        options.exception.map((e) => {
          if (Object.keys(e)[0] === String(i)) {
            (options.element as HTMLCollection)[i].setAttribute(
              'style',
              Object.values(e)[0][0]
            );
          } else {
            value.push(options.style);
          }
        });
      } else {
        value.push(options.style);
      }
    }
    value = [value.join('; ')];
    for (let i = 0; i < (options.element as HTMLCollection).length; i++) {
      if (options.exception) {
        options.exception.map((e) => {
          if (Object.keys(e)[0] !== String(i)) {
            (options.element as HTMLCollection)[i].setAttribute(
              'style',
              value[0]
            );
          }
        });
      } else {
        (options.element as HTMLCollection)[i].setAttribute('style', value[0]);
      }
    }
  }
};
