import SignIn from "./signIn.riot";
import { expect } from "chai";
import { component } from "riot";

describe("SignIn Unit Test", () => {
  const mountSignIn = component(SignIn);

  it("The component is properly rendered", () => {
    const div = document.createElement("div");

    const component = mountSignIn(div);

    expect(component.$$("a")[0].textContent).to.be.equal("New User");
    expect(component.$$("a")[1].textContent).to.be.equal("Forgot password");
    expect(component.$$("label")[0].textContent).to.be.equal("Email");
    expect(component.$$("label")[1].textContent).to.be.equal("Password");
    expect(component.$$("button")[0].textContent).to.be.equal("Send");
  });
});
