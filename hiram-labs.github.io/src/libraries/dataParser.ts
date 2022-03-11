/**
 * Function to split a sentence into two. If the number of words are odd the return value at index 1 gets the extra word
 *
 * @param str The sentence to split into half
 * @returns array with two strings the first string contains the first half of the sentence and the second string contains the second half
 */
export const stringHalfer = (str: string) => {
  return [
    str
      .split(' ')
      .slice()
      .splice(0, Math.floor(str.split(' ').length / 2))
      .join(' '),
    str
      .split(' ')
      .slice()
      .splice(Math.floor(str.split(' ').length / 2), str.length + 1)
      .join(' ')
  ];
};

/**
 * Function to split an array into two. If the number of elements are odd the returned array at index 1 gets the extra word
 *
 * @param Array The array to split into half
 * @returns array with two subarrays the first array contains the first half of the argument and the second array contains the second half
 */
export function arrayHalfer<T>(arr: T[]) {
  return [
    arr.slice().splice(0, Math.floor(arr.length / 2)),
    arr.slice().splice(Math.floor(arr.length / 2), arr.length + 1)
  ];
}
