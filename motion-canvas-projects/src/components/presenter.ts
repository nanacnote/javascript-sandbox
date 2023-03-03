import {
  ComponentChildren,
  Layout,
  Node,
  NodeProps,
  Rect,
  Text,
  View2D,
} from "@motion-canvas/2d/lib/components";
import { initial, signal } from "@motion-canvas/2d/lib/decorators";
import { all, waitUntil } from "@motion-canvas/core/lib/flow";
import { createSignal, SimpleSignal } from "@motion-canvas/core/lib/signals";
import { ThreadGenerator } from "@motion-canvas/core/lib/threading";

interface ICopy {
  aside: {
    id: number;
    topic: string;
    subtopics?: string[];
    description?: string;
  }[];
  main: {
    asideID: number;
  }[];
}

export interface IPresenterProps extends NodeProps {
  viewContext: View2D;
  copy: ICopy;
  onSubtopic(props: ICopy["main"][number]): ThreadGenerator;
}

export class Presenter extends Node {
  @initial(0)
  @signal()
  public declare readonly animAsideSecIn: SimpleSignal<number, this>;
  @initial(0)
  @signal()
  public declare readonly animMainSecIn: SimpleSignal<number, this>;

  private declare readonly viewContext;
  private declare readonly copy;
  private declare readonly onSubtopic;

  private declare asideRect: Rect;
  private declare mainRect: Rect;

  public constructor(props: IPresenterProps) {
    super({
      ...props,
      children: undefined,
    });
    this.viewContext = props.viewContext;
    this.copy = props.copy;
    this.onSubtopic = props.onSubtopic;
  }

  private generateSec() {
    this.viewContext.add(this);
    this.asideRect = new Rect({
      layout: true,
      direction: "column",
      padding: 50,
      gap: 50,
      size: [442.5, 980],
    });
    this.mainRect = new Rect({
      layout: true,
      padding: 50,
      size: [1327.5, 980],
    });
    this.add(
      new Layout({
        layout: true,
        gap: 50,
        padding: 50,
        size: "100%",
        children: [
          new Rect({
            fill: theme["base-300"],
            grow: this.animAsideSecIn,
            radius: 20,
            children: new Layout({
              layout: false,
              children: this.asideRect,
            }),
          }),
          new Rect({
            fill: theme["base-300"],
            grow: this.animMainSecIn,
            radius: 20,
            children: new Layout({ layout: false, children: this.mainRect }),
          }),
        ],
      })
    );
  }

  private *introduceTopic(props: ICopy["aside"][number], topicIndex: number) {
    const duration = 1;
    const topicTextSig = createSignal(0);
    const spawnedNodeScaleSig = createSignal(0);
    const topic = new Node({
      spawner: () => [
        new Text({
          ...theme["h1-text"],
          alignItems: "end",
          grow: 1,
          text: props.topic.substring(0, topicTextSig() * props.topic.length),
        }),
      ],
    });
    const desc = new Text({
      ...theme["p-text"],
      grow: 1,
      opacity: 0,
      text: props.description,
    });
    const spawnedNode = new Node({
      spawner: () => [
        new Rect({
          fill: theme["primary"],
          padding: 15,
          radius: 10,
          width: "100%",
          scale: spawnedNodeScaleSig,
          children: new Text({
            ...theme["btn-text"],
            text:
              props.topic.length < 15
                ? props.topic
                : props.topic.substring(0, 15) + "...",
          }),
        }),
      ],
    });
    Object.assign(spawnedNode, { subtopics: props.subtopics });
    this.mainRect.insert(
      new Rect({
        layout: true,
        direction: "column",
        gap: 50,
        paddingLeft: 100,
        size: [1177.5, 830],
        children: [topic, desc],
      })
    );
    yield* topicTextSig(1, duration / 2);
    yield* desc.opacity(0.75, duration / 2);
    yield* waitUntil("intro_" + topicIndex);
    yield* all(topic.opacity(0, duration / 3), desc.opacity(0, duration / 3));
    this.mainRect.removeChildren();
    this.asideRect.insert(spawnedNode, this.asideRect.children().length);
    yield* spawnedNodeScaleSig(1, duration / 3);
  }

  private *discussTopic(props: ICopy["main"][number], topicIndex: number) {
    const duration = 1;
    const allAsideNodes = this.asideRect.children();
    const curAsideNode = this.asideRect.children()[topicIndex];
    const subtopicTexts = (curAsideNode as any).subtopics.map(
      (subtopic: string) =>
        new Text({
          ...theme["md-text"],
          lineHeight: 50,
          opacity: 0,
          text:
            subtopic.length < 12
              ? "• " + subtopic
              : "• " + subtopic.substring(0, 12) + "...",
        })
    );
    // collapses all opened subtopics except the ones belonging to current topic under discussion
    for (let i = 0, len = allAsideNodes.length; i < len; i++) {
      const asideNodeChildren = allAsideNodes[i].children();
      if (asideNodeChildren.length > 1) {
        const subtopicTexts = asideNodeChildren[1].children() as Text[];
        for (let j = 0, len = subtopicTexts.length; j < len; j++) {
          yield* all(
            subtopicTexts[j].height(0, duration / 3 / len),
            subtopicTexts[j].opacity(0, duration / 3 / len)
          );
        }
        asideNodeChildren[1].remove();
      }
    }
    const subtopicsRect = new Rect({
      paddingLeft: 35,
      layout: true,
      direction: "column",
    });
    curAsideNode.insert(subtopicsRect, 1);
    // inserts subtopics iteratively for current topic under discussion
    for (let k = 0, len = subtopicTexts.length; k < len; k++) {
      subtopicsRect.insert(subtopicTexts[k], k);
      if (k > 0) {
        yield* subtopicTexts[k - 1].opacity(0.25, duration / 3 / len);
      }
      yield* subtopicTexts[k].opacity(1, duration / 3 / len);
      yield* this.onSubtopic.call(this, props);
      if (k === len - 1) {
        yield* subtopicTexts[k].opacity(0.25, duration / 3 / len);
      }
      // removes overflowing nodes
      for (let l = 0, len = allAsideNodes.length; l < len; l++) {
        const curAsideRect = allAsideNodes[l].children()[0];
        if (curAsideRect.position().y > 400) {
          yield* curAsideRect.opacity(0, 0.01);
        } else {
          yield* curAsideRect.opacity(1, 0.01);
        }
      }
    }
    yield* waitUntil("disc_" + topicIndex);
  }

  public *initialise() {
    const duration = 2;
    this.generateSec();
    yield* this.animAsideSecIn(1, duration / 2);
    yield* this.animMainSecIn(3, duration / 2);
    for (let i = 0, len = this.copy["aside"].length; i < len; i++) {
      yield* this.introduceTopic(this.copy["aside"][i], i);
    }
    for (let i = 0, len = this.copy["main"].length; i < len; i++) {
      yield* this.discussTopic(this.copy["main"][i], i);
    }
  }

  public addToMain(node: ComponentChildren) {
    this.mainRect.insert(node);
  }
}

const themeTextColor = "hsl(0, 0%, 82.51%)";
const theme = {
  primary: "hsl(210, 64.103%, 30.588%)",
  "primary-focus": "hsl(210, 64.103%, 24.471%)",
  "primary-content": "hsl(210, 100%, 86.118%)",

  secondary: "hsl(200, 12.931%, 54.51%)",
  "secondary-focus": "hsl(200, 12.931%, 43.608%)",
  "secondary-content": "hsl(200, 100%, 10.902%)",

  accent: "hsl(12.515, 79.512%, 59.804%)",
  "accent-focus": "hsl(12.515, 79.512%, 47.843%)",
  "accent-content": "hsl(12.515, 100%, 11.961%)",

  neutral: "hsl(212.73, 13.58%, 15.882%)",
  "neutral-focus": "hsl(212.73, 13.58%, 12.706%)",
  "neutral-content": "hsl(212.73, 28.205%, 83.176%)",

  "base-100": "hsl(0, 0%, 12.549%)",
  "base-200": "hsl(0, 0%, 11.294%)",
  "base-300": "hsl(0, 0%, 10.165%)",
  "base-content": themeTextColor,

  info: "hsl(199.15, 100%, 41.765%)",
  "info-content": "hsl(199.15, 100%, 88.353%)",

  success: "hsl(144, 30.973%, 55.686%)",
  "success-content": "hsl(144, 100%, 11.137%)",

  warning: "hsl(39.231, 64.356%, 60.392%)",
  "warning-content": "hsl(39.231, 100%, 12.078%)",

  error: "hsl(6.3415, 55.656%, 43.333%)",
  "error-content": "hsl(6.3415, 100%, 88.667%)",

  "h1-text": {
    fill: themeTextColor,
    fontSize: 70,
    fontWeight: 800,
    lineHeight: 100,
    fontFamily: "Fira Code",
  },

  "p-text": {
    fill: themeTextColor,
    fontSize: 40,
    fontWeight: 500,
    lineHeight: 65,
    fontFamily: "Fira Code",
  },

  "md-text": {
    fill: themeTextColor,
    fontSize: 30,
    fontFamily: "Fira Code",
  },

  "md-strong-text": {
    fill: themeTextColor,
    fontSize: 30,
    fontWeight: 600,
    fontFamily: "Fira Code",
  },

  "sm-text": {
    fill: themeTextColor,
    fontSize: 26,
    fontFamily: "Fira Code",
  },

  "sm-strong-text": {
    fill: themeTextColor,
    fontSize: 26,
    fontWeight: 600,
    fontFamily: "Fira Code",
  },

  "btn-text": {
    fill: themeTextColor,
    fontSize: 30,
    lineHeight: 40,
    fontFamily: "Fira Code",
  },
};
