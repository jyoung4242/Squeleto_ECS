import { v4 as uuidv4 } from "uuid";
import { Entity } from "../../_Squeleto/ECS/entity";
import map from "../Assets/map.png";

export class MapEntity {
  static create() {
    return Entity.create({
      id: uuidv4(),
      components: {
        size: [640, 640],
        position: [0, 0],
        sprite: map,
      },
    });
  }
}
