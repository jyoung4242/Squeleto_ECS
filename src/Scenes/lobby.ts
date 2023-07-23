//Library
import { Camera, ICameraConfig } from "../../_Squeleto/Camera";
import { Scene } from "../../_Squeleto/Scene";
import { Engine } from "@peasy-lib/peasy-engine";

//Scene Systems
import { LobbySystem } from "../Systems/LobbyUI";
import { Vector } from "../../_Squeleto/ECS/Vector";

//Entities
import { LobbyHUDEntity } from "../Entities/HUDentity";

export class Lobby extends Scene {
  name: string = "lobby";
  entitySystems: any = [];
  sceneSystems: any = [];
  entities: any = [];
  public template = `
    <scene-layer>
      < \${ sceneSystem === } \${ sceneSystem <=* sceneSystems }
    </scene-layer>
  `;
  //
  //runs on entry of scene
  public init(): void {
    console.log("creating HUD");
    this.entities.push(LobbyHUDEntity.create());

    console.log("creating camera");
    const cameraConfig: ICameraConfig = {
      name: "camera",
      gameEntities: this.entities,
      position: new Vector(0, 0),
      size: new Vector(400, 266.67),
      viewPortSystems: [],
    };
    let camera = Camera.create(cameraConfig);
    console.log("camera: ", camera);
    //GameLoop
    console.log("starting engine");
    camera.vpSystems.push(new LobbySystem());
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
