import { makeScene2D } from "@motion-canvas/2d";
import { waitFor } from "@motion-canvas/core/lib/flow";
import { Presenter } from "../../components/presenter";
import { Buffer } from "../../components/buffer";
import copy from "./copy";
import theme from "./theme";

export default makeScene2D(function* (view) {
  yield* new Presenter({
    copy,
    viewContext: view,
    onSubtopic: function* (entry) {
      const inst = this as Presenter;
      const buffer = new Buffer({
        cellShape: "rect",
        cellLength: 9,
        cellText: [1, 2, 3, 4, 5, 6],
      });

      inst.addToMain(buffer.rootLayout);

      yield* waitFor(1);
      yield* buffer.cells[0].setText(100);
      yield* buffer.cells[0].rect.fill(theme["primary"], 2);
      yield* waitFor(1);
      yield* buffer.cells[1].window(6);
      yield* waitFor(1);
      yield* buffer.changeCellShape("circle");
      yield* waitFor(1);
      yield* buffer.cells[4].window(8);
      yield* waitFor(1);
      yield* buffer.cells[4].undoWindow();
      yield* waitFor(1);
      yield* buffer.changeCellShape("rect");
      yield* waitFor(1);
      yield* buffer.cells[3].setText(45, 0.25);
      yield* waitFor(1);
      yield* buffer.cells[0].window(3);
      yield* waitFor(1);
      yield* buffer.cells[4].undoWindow();
      yield* waitFor(1);
      yield* buffer.cells[5].setText(
        parseInt(buffer.cells[5].getText()) + 1000
      );
      yield* waitFor(1);
      yield* buffer.cells[8].setText(1234565678);
      yield* waitFor(1);
      yield* buffer.cells[8].highlight();
      yield* waitFor(1);
      yield* buffer.cells[8].undoHighlight();
      yield* waitFor(1);
      yield* buffer.cells[2].setText("Goat");
      yield* buffer.cells[2].focus();
      yield* waitFor(1);
      yield* buffer.cells[2].undoFocus();
      yield* waitFor(1);

      buffer.cells.map((entity) => entity.remove());
      waitFor(60);
    },
  }).initialise();
});
