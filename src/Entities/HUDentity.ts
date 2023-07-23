import { v4 as uuidv4 } from "uuid";
import { Entity } from "../../_Squeleto/ECS/entity";

export class LobbyHUDEntity {
  static create() {
    return Entity.create({
      id: uuidv4(),
      components: {
        HUD: null, //this is tied to templateComponent.ts
      },
    });
  }
}
