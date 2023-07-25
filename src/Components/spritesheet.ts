import { Component } from "../../_Squeleto/ECS/component";
import { Vector } from "../../_Squeleto/ECS/Vector";

export interface ISpriteSheetComponent {
  src: string;
  frameSize: Vector;
  size: Vector;
  rows: number;
  cols: number;
  framerate: number;
  sequence: Map<string, Array<number>>;
  defaultSequence: string;
}

export type SpriteSheetType = {
  src: string;
  position: Vector;
  size: Vector;
  bgX: number;
  bgY: number;
};

export interface SpriteSheetComponent {
  Sprite: SpriteSheetType;
}

export class SpriteSheet extends Component {
  public value: SpriteSheetType | undefined;
  public imgElement: HTMLImageElement;
  frame: number;
  frames: any;
  frameSize: Vector;
  frameRate: number;
  rows: number;
  cols: number;
  sequence: Map<string, Array<number>>;
  currentSequence: string;
  animationHandler: NodeJS.Timer | undefined;
  animationTik: number;
  isAnimationRunning: boolean = false;
  public template = `
    <style>
      .spritesheet-component {
        position: absolute;
        top: 0px;
        left: 0px;
        background-size: contain;        
      }
    </style>
    <spritesheet-layer class="spritesheet-component" style="background-image: url(\${value.src});background-position: -\${bgX}px \${bgY}px;transform: translate(\${value.position.x}px, \${value.position.y}px);width: \${value.size.x}px; height: \${value.size.y}px; "></spritesheet-layer>
    `;

  public constructor() {
    //@ts-ignore
    super("spritesheet", SpriteSheet, true);
    this.value = {
      src: "",
      position: new Vector(0, 0),
      size: new Vector(0, 0),
      bgX: 0,
      bgY: 0,
    };
    this.frame = 0;
    this.frames = [];
    this.frameSize = new Vector(0, 0);
    this.imgElement = new Image();
    this.rows = 0;
    this.cols = 0;
    this.sequence = new Map<string, Array<number>>();
    this.currentSequence = "";
    this.animationTik = 0;
    this.frameRate = 0;
  }

  public define(data: ISpriteSheetComponent): void {
    if (data == null) {
      return;
    }

    this.imgElement = new Image();
    this.imgElement.onload = () => {
      this.value = {
        src: this.imgElement.src,
        position: new Vector(0, 0),
        size: new Vector(data.size.x, data.size.y),
        bgX: 0,
        bgY: 0,
      };

      for (let index = 0; index < this.cols; index++) {
        for (let innerIndex = 0; innerIndex < this.rows; innerIndex++) {
          const frameIndex = this.cols * (index + 1) - (this.rows - innerIndex);
          this.frames[frameIndex] = { x: -innerIndex * this.frameSize.x, y: -index * this.frameSize.y };
        }
      }
      console.log(this.frames);
      this.animationHandler = setInterval(this.tik, 25);
    };
    this.imgElement.src = data as unknown as string;
    this.frameSize = new Vector(data.frameSize.x, data.frameSize.y);
  }

  tik = () => {
    if (this.isAnimationRunning) {
      this.animationTik += 25;
      if (this.animationTik >= this.frameRate) {
        this.animationTik = 0;
        this.frame++;
        if (this.frame >= this.frames.length) this.frame = 0;
        //@ts-ignore
        //this.value?.bgX = this.frames[this.frame].x;
        //@ts-ignore
        //this.value?.bgY = this.frames[this.frame].y;
      }
    }
  };
}
