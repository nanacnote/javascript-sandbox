import { makeProject } from "@motion-canvas/core/lib";

import theme from "./theme";
import main from "./main?scene";

import "./index.css";

export default makeProject({
  scenes: [main],
  background: theme["base-100"],
});
