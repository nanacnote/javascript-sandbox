/**
 * Returns the value of a key (also in deep nested objects)
 * If because of nesting the key appears multiple times you can
 * add `key.[at]` where key is the `key` whose value you want and
 * `at` is the instance of that key.
 *
 * object
 *
 * @param obj
 * @param key
 * @returns
 *
 * @example
 * const test = {foo: {foo: 'bar'}}
 *
 * objectGetValue(test, 'foo') => // {foo: 'bar'}
 * objectGetValue(test, 'foo.2') => // 'bar'
 */
export function getValueOfKey(obj, key) {
  let trackingList = [];

  const cleanup = (o) => {
    Object.keys(o).forEach((k) => {
      if (!o[k]) {
        o[k] = '';
      }
    });
    return o;
  };

  const lookup = (o, k) => {
    for (const [_k, _v] of Object.entries(cleanup(o))) {
      if (_k === k) trackingList.push(_v);
      if (typeof _v === 'object') {
        lookup(_v, k);
      }
    }
  };

  if (typeof obj === 'object' && typeof key === 'string') {
    const [searchKey, idx] = key.split('.');
    const index = parseInt(idx) > 1 ? parseInt(idx) - 1 : 0;
    lookup(obj, searchKey);
    return trackingList[index];
  }

  if (typeof obj === 'object' && typeof key === 'object') {
    const values = [];
    key.forEach((k) => {
      const [searchKey, idx] = k.split('.');
      const index = parseInt(idx) > 1 ? parseInt(idx) - 1 : 0;
      lookup(obj, searchKey);
      values.push(trackingList[index]);
      trackingList = [];
    });
    return values;
  }

  throw new Error('obj | key param type error. Check jsdoc @ src/util/lib.js');
}
