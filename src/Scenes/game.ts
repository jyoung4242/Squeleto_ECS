//Library
import { Scene } from "../../_Squeleto/Scene";
import { Engine } from "@peasy-lib/peasy-engine";
import { Vector } from "../../_Squeleto/ECS/Vector";
import { MultiPlayerInterface } from "../../_Squeleto/Multiplayer";

//Scene Systems
import { Camera, ICameraConfig } from "../../_Squeleto/Camera";

//Entities

export class Game extends Scene {
  name: string = "game";
  entities: any = [];
  entitySystems: any = [];
  sceneSystems: any = [];
  HathoraClient: MultiPlayerInterface | undefined;
  public template = `
      <scene-layer>
          < \${ sceneSystem === } \${ sceneSystem <=* sceneSystems }
      </scene-layer>
    `;

  public init(): void {
    console.log("**************************************");
    console.log("ENTERING GAME SCENE");
    console.log("**************************************");
    this.HathoraClient = this.params[0];
    (this.HathoraClient as MultiPlayerInterface).updateCallback = this.serverMessageHandler;

    console.log("creating camera");
    const cameraConfig: ICameraConfig = {
      name: "camera",
      gameEntities: this.entities,
      position: new Vector(0, 0),
      size: new Vector(400, 266.67),
      viewPortSystems: [],
    };

    let camera = Camera.create(cameraConfig);

    //GameLoop
    console.log("starting engine");
    this.sceneSystems.push(camera);

    Engine.create({ fps: 60, started: true, callback: this.update });
  }

  public exit(): void {}

  serverMessageHandler(msg: any) {
    console.log("game:", msg);
  }
}
