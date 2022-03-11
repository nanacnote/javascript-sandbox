import SignUp from "./signUp.riot";
import { expect } from "chai";
import { component } from "riot";

describe("SignUp Unit Test", () => {
  const mountSignUp = component(SignUp);

  it("The component is properly rendered", () => {
    const div = document.createElement("div");

    const component = mountSignUp(div);

    expect(component.$$("a")[0].textContent).to.be.equal("Existing User");
    expect(component.$$("label")[0].textContent).to.be.equal("Email");
    expect(component.$$("label")[1].textContent).to.be.equal("Password");
    expect(component.$$("button")[0].textContent).to.be.equal("Send");
  });
});
