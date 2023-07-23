//Library
import { Camera } from "../../_Squeleto/Camera";
import { Scene } from "../../_Squeleto/Scene";
import { Engine } from "@peasy-lib/peasy-engine";

//Scene Systems
// import {myScene} from "../Systems/mySystem.ts"

//Entities
// import {myEntity} from "../Entities/myEntity.ts"

export class Game extends Scene {
  name: string = "game";
  entitySystems: any = [];
  sceneSystems: any = [];
  entities: any = [];
  public template = `
    <scene-layer>
        < \${ sceneSystem === } \${ sceneSystem <=* sceneSystems }
    </scene-layer>
  `;

  //runs on entry of scene
  public init(): void {
    let camera = Camera.create();

    //GameLoop
    console.log("starting engine");
    this.sceneSystems.push(camera);

    Engine.create({ fps: 60, started: true, callback: this.update });
  }

  update = (deltaTime: number): void | Promise<void> => {
    this.sceneSystems.forEach((system: any) => {
      system.update(deltaTime / 1000, 0, this.entities);
    });
  };

  //runs on exit of scene
  public exit(): void {}
}
