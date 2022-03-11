import Navbar from "./navbar.riot";
import { expect } from "chai";
import { component } from "riot";

describe("Navbar Unit Test", () => {
  const mountNavbar = component(Navbar);

  it("The component is properly rendered", () => {
    const div = document.createElement("div");

    const component = mountNavbar(div);

    expect(component.$$("a")).to.have.lengthOf(6);
    expect(component.$$("svg")).to.have.lengthOf(1);
    expect(component.$$("nav:nth-child(2) > div")).to.have.lengthOf(3);
  });
});
