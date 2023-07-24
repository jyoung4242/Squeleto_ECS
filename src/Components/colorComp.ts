import { Component } from "../../_Squeleto/ECS/component";

export interface IColorComponent {
  color: string;
}

export type ColorType = string;

export interface ColorComponent {
  color: ColorType;
}

export class Color extends Component {
  public template = `
    <style>
      .color-component {
        position: absolute;
        width: 16px;
        height: 16px;
        top: -8px;
        left: -8px;
      }
    </style>
    <div class="color-component" style="background-color: \${value};"></div>
    `;

  public value = "";
  public constructor() {
    //@ts-ignore
    super("color", Color, true);
  }

  public define(data: string): void {
    if (data == null) {
      return;
    }
    this.value = data;
  }
}
