import { getValueOfKey } from './lib';
import { expect, assert } from 'chai';

describe('Utilities Unit Test', () => {
  const data = {
    car: { name: 'Mercedes', color: 'black' },
    jet: { name: 'Boeing', color: 'springgreen' },
  };

  it('Gets the first value match given key as string only', () => {
    const value = getValueOfKey(data, 'color');

    expect(value).to.be.equal('black');
  });

  it('Gets the first value match given key as string dot index', () => {
    const value = getValueOfKey(data, 'color.1');

    expect(value).to.be.equal('black');
  });

  it('Gets the second value match given key as string dot index', () => {
    const value = getValueOfKey(data, 'color.2');

    expect(value).to.be.equal('springgreen');
  });

  it('Gets the array of values matching keys as string', () => {
    const value = getValueOfKey(data, [
      'name',
      'name.1',
      'name.2',
      'color',
      'color.1',
      'color.2',
    ]);

    assert.lengthOf(value, 6);
    assert.equal(value[0], value[1]);
  });

  it('Return undefined for non existing key', () => {
    const value = getValueOfKey(data, 'unknown');

    expect(value).to.be.undefined;
  });

  it('Throw if param 1 is not a valid object', () => {
    expect(getValueOfKey.bind('data', 'color')).to.throw();
  });
});
