import { Color } from "./colorComp";
import { Name } from "./nameComp";
import { Position } from "./positionComp";
import { Velocity } from "./velocityComp";
import { Sprite } from "./spriteComp";
import { KeyboardComp } from "./keyboard";

export function LoadComponents() {
  [new Color(), new Name(), new Position(), new Velocity(), new Sprite(), new KeyboardComp()];
}
