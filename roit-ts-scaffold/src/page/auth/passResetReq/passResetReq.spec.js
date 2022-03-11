import PassResetReq from "./passResetReq.riot";
import { expect } from "chai";
import { component } from "riot";

describe("PassResetReq Unit Test", () => {
  const mountPassResetReq = component(PassResetReq);

  it("The component is properly rendered", () => {
    const div = document.createElement("div");

    const component = mountPassResetReq(div);

    expect(component.$$("label")[0].textContent).to.be.equal("Email");
    expect(component.$$("button")[0].textContent).to.be.equal("Send");
  });
});
