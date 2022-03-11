import sinon from "sinon";
import { register, install } from "riot";
import { Route, Router } from "@riotjs/route";

global.requestAnimationFrame = sinon.fake();

export const mochaHooks = {
  beforeAll() {
    install((component) => {
      component.router = { push: sinon.fake() };
      component.api = { auth: sinon.fake(), stream: sinon.fake() };
    });

    register("router", Router);
    register("route", Route);
  },

  afterEach() {
    sinon.restore();
  },
};
