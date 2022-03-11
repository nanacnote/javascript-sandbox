const { Collection } = require("../src/Collection");
const { Message } = require("../src/Message");
const { Notification } = require("../src/Notification");

describe("Collection Class", () => {
  describe("Constructor", () => {
    test("Correct ORM name is passed as arg", () => {
      expect(
        new Collection("MESSAGES").constructor instanceof Message.constructor
      ).toBeTruthy();
      expect(
        new Collection("NOTIFICATIONS").constructor instanceof
          Notification.constructor
      ).toBeTruthy();
    });
  });

  describe("method [then]", () => {
    test("Check list \n- Accepts a function as arg \n- passes the accepted function a list \n- returns a promise which resolves with the collection", () => {
      const callback = (list) => {
        expect(Array.isArray(list)).toBeTruthy();
        return list;
      };
      new Collection("MESSAGES")
        .then(callback)
        .then(() => new Collection("NOTIFICATIONS").then(callback))
        .then((returnValue) => expect(Array.isArray(returnValue)).toBeTruthy());
    });
  });
});
