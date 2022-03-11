import PassReset from "./passReset.riot";
import { expect } from "chai";
import { component } from "riot";

describe("PassReset Unit Test", () => {
  const mountPassReset = component(PassReset);

  it("The component is properly rendered", () => {
    const div = document.createElement("div");

    const component = mountPassReset(div);

    expect(component.$$("label")[0].textContent).to.be.equal("New Password");
    expect(component.$$("button")[0].textContent).to.be.equal("Send");
  });
});
