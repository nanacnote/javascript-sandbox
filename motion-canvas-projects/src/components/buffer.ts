import {
  Layout,
  Node,
  NodeProps,
  Rect,
  Text,
} from "@motion-canvas/2d/lib/components";
import { initial, signal } from "@motion-canvas/2d/lib/decorators";
import { all } from "@motion-canvas/core/lib/flow";
import { SimpleSignal } from "@motion-canvas/core/lib/signals";
import { ThreadGenerator } from "@motion-canvas/core/lib/threading";
import { range } from "@motion-canvas/core/lib/utils";
import theme from "../projects/compendium/theme";

interface IMCellStruct {
  index: number;
  rect: Rect;
  remove(): void;
  getText(): string;
  setText(val: string | number, duration?: number): ThreadGenerator;
  focus(scale?: number, zIndex?: number, duration?: number): ThreadGenerator;
  undoFocus(duration?: number): ThreadGenerator;
  highlight(duration?: number): ThreadGenerator;
  undoHighlight(duration?: number): ThreadGenerator;
  window(to: number, duration?: number): ThreadGenerator;
  undoWindow(duration?: number): ThreadGenerator;
}

export interface IBufferProps extends NodeProps {
  cellLength: number;
  cellText?: string[] | number[];
  cellShape?: "rect" | "circle";
}

export class Buffer extends Node {
  @initial(0)
  @signal()
  public declare readonly cellShape: SimpleSignal<
    IBufferProps["cellShape"],
    this
  >;

  private declare cellsLayout: Layout;
  private declare cellStructCollection: IMCellStruct[];

  private cellDimension = 50;
  private cellLineWidth = 4;
  private cellCircleShapeMarginRight = 15;
  private cellStrokeColor = theme["primary"];
  private cellFocusFillColor = theme["base-300"];
  private cellWindowStrokeColor = theme["success"];
  private cellHighlightStroke = theme["accent"];
  private cellHighlightLineWidth = this.cellLineWidth + 2;

  public constructor(props: IBufferProps) {
    super({
      ...props,
      children: undefined,
    });

    this.cellStructCollection = this.genCells(props);
    this.cellsLayout = this.wrapCellsInLayout();
  }

  private genCells(props: IBufferProps) {
    const clsThis = this;
    const textNodeIndex = 0;
    return range(props.cellLength).map<IMCellStruct>((index) => ({
      index,
      rect: new Rect({
        stroke: clsThis.cellStrokeColor,
        lineWidth: clsThis.cellLineWidth,
        radius: () =>
          this.cellShape() === "circle" ? clsThis.cellDimension : 0,
        marginRight: () =>
          this.cellShape() === "circle"
            ? clsThis.cellCircleShapeMarginRight
            : 0,
        width: clsThis.cellDimension,
        height: clsThis.cellDimension,
        position: [index * clsThis.cellDimension - 500, 0],
        children: new Text({
          layout: false,
          text: props.cellText[index]
            ? props.cellText[index].toString()
            : undefined,
          ...theme["sm-strong-text"],
        }),
      }),
      remove() {
        this.rect.remove();
      },
      getText() {
        return this.rect.children()[textNodeIndex].text();
      },
      *setText(value, duration = 0) {
        const calcNextXPosition = (j: number) =>
          j === 0
            ? clsThis.cellStructCollection[j].rect.position.x()
            : clsThis.cellStructCollection[j - 1].rect.position.x() +
              clsThis.cellStructCollection[j - 1].rect.width();
        // hide all mCells (memory cells)
        for (
          let j = 0, len = clsThis.cellStructCollection.length;
          j < len;
          j++
        ) {
          yield* clsThis.cellStructCollection[j].rect.opacity(0, duration);
        }
        // insert text and adjust all positions to accommodate new width
        for (
          let j = 0, len = clsThis.cellStructCollection.length;
          j < len;
          j++
        ) {
          if (j === index) {
            yield* this.rect
              .children()
              [textNodeIndex].text(value.toString(), 0);
            yield* clsThis.cellStructCollection[j].rect.width(
              Math.max(
                this.rect.children()[textNodeIndex].width() + 30,
                clsThis.cellDimension
              ),
              0
            );
            yield* all(
              clsThis.cellStructCollection[j].rect.position.x(
                calcNextXPosition(j),
                duration
              ),
              clsThis.cellStructCollection[j].rect.opacity(1, duration)
            );
          } else {
            yield* all(
              clsThis.cellStructCollection[j].rect.opacity(1, duration),
              clsThis.cellStructCollection[j].rect.position.x(
                calcNextXPosition(j),
                duration
              )
            );
          }
        }
      },
      *focus(scale = 2, zIndex = 1000, duration = 0.5) {
        yield* all(
          this.rect.scale(scale, duration),
          this.rect.zIndex(zIndex, duration),
          this.rect.fill(clsThis.cellFocusFillColor, duration)
        );
      },
      *undoFocus(duration = 0.5) {
        yield* all(
          this.rect.scale(1, duration),
          this.rect.zIndex(0, duration),
          this.rect.fill(null, duration)
        );
      },
      *highlight(duration = 0.5) {
        yield* all(
          this.rect.stroke(clsThis.cellHighlightStroke, duration),
          this.rect.lineWidth(clsThis.cellHighlightLineWidth, duration)
        );
      },
      *undoHighlight(duration = 0.5) {
        yield* all(
          this.rect.stroke(clsThis.cellStrokeColor, duration),
          this.rect.lineWidth(clsThis.cellLineWidth, duration)
        );
      },
      *window(to: number, duration = 0.5) {
        const windowRect = clsThis.cellsLayout.children()[0] as Rect;
        yield* all(
          windowRect.position.y(this.rect.position.y(), duration),
          windowRect.position.x(
            (this.rect.position.x() +
              clsThis.cellStructCollection[to - 1].rect.position.x()) /
              2,
            duration
          )
        );
        yield* windowRect.layout(false, 0);
        yield* all(
          windowRect.lineWidth(clsThis.cellLineWidth, duration),
          windowRect.width(
            clsThis.cellStructCollection
              .slice(this.index, to)
              .reduce(
                (acc, cur) =>
                  acc +
                  cur.rect.width() +
                  (cur.rect.margin.right() ? cur.rect.margin.right() : 0),
                0
              ),
            duration
          )
        );
      },
      *undoWindow(duration = 0.5) {
        yield* (clsThis.cellsLayout.children()[0] as Rect).lineWidth(
          0,
          duration
        );
      },
    }));
  }

  private wrapCellsInLayout() {
    const windowRect = new Rect({
      zIndex: 1,
      height: this.cellDimension,
      stroke: this.cellWindowStrokeColor,
      radius: () =>
        this.cellShape() === "circle" ? this.cellDimension : undefined,
    });
    const cellsWrapperNode = new Node({
      children: this.cellStructCollection.map((item) => item.rect),
    });
    return new Layout({
      position: [0, 0],
      children: [windowRect, cellsWrapperNode],
    });
  }

  public *changeCellShape(shape: IBufferProps["cellShape"], duration = 0.5) {
    yield* this.cellShape(shape, duration);
  }

  public get rootLayout() {
    return this.cellsLayout;
  }

  public get cells() {
    return this.cellStructCollection;
  }
}
