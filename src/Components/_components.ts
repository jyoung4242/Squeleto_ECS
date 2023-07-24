import { Color } from "./colorComp";
import { Name } from "./nameComp";
import { Position } from "./positionComp";
import { Velocity } from "./velocityComp";
import { Sprite } from "./spriteComp";

export function LoadComponents() {
  [new Color(), new Name(), new Position(), new Velocity(), new Sprite()];
}
