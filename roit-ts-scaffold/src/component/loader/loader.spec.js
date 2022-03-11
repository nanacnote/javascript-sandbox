import HourGlass from "./hourGlass.riot";
import { expect } from "chai";
import { component } from "riot";

describe("HourGlass Unit Test", () => {
  const mountHourGlass = component(HourGlass);

  it("HourGlass is properly rendered", () => {
    const div = document.createElement("div");
    const component = mountHourGlass(div);

    expect(component.$$("*")).to.have.lengthOf(0);
  });
});
