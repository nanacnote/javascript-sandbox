import Template from "./template.riot";
import { expect } from "chai";
import { component } from "riot";

const component = component(Template)(document.createElement("div"))

describe("Template Unit Test", () => {
  it("The component is properly rendered", () => {
    expect(component.$$("span")[0].textContent).to.be.equal("Template");
  });
});