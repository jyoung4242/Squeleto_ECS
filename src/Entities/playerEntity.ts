import { v4 as uuidv4 } from "uuid";
import { Entity } from "../../_Squeleto/ECS/entity";
import { randomColor } from "../Utility/util";
import { Vector } from "../../_Squeleto/ECS/Vector";

export class PlayerEntity {
  static create(name: string, position: Vector) {
    return Entity.create({
      id: uuidv4(),
      components: {
        name: name,
        color: randomColor(),
        position: position,
        keyboard: "",
      },
    });
  }
}
