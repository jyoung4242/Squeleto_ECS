import { v4 as uuidv4 } from "uuid";
import { Entity } from "../../_Squeleto/ECS/entity";

export class TemplateEntity {
  static create() {
    return Entity.create({
      id: uuidv4(),
      components: {
        foo: "bar", //this is tied to templateComponent.ts
      },
    });
  }
}
