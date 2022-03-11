import { _Directory } from "../src/modules/_Directory";

test("should return instance of _Directory", () => {
  expect(new _Directory({ category: 'HOSPITALS' })).toBeInstanceOf(_Directory);
});
