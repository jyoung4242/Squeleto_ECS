//Library
import { Scene } from "../../_Squeleto/Scene";
import { Engine } from "@peasy-lib/peasy-engine";
import { Vector } from "../../_Squeleto/ECS/Vector";
import { MultiPlayerInterface } from "../../_Squeleto/Multiplayer";

//Scene Systems
import { Camera, ICameraConfig } from "../../_Squeleto/Camera";

//Entities

//Server Messages
import {
  ServerMessageTypes,
  ServerErrorMessage,
  ServerStateUpdateMessage,
  ServerJoinMessage,
  ServerPlayerLeftMessage,
} from "../Server/server";
import { PlayerEntity } from "../Entities/playerEntity";

export class Game extends Scene {
  firstUpdate: Boolean = true;
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

  serverMessageHandler = (msg: ServerMessageTypes) => {
    switch (msg.type) {
      case "stateupdate":
        this.stateUpdate((msg as ServerStateUpdateMessage).state);
        break;
      case "newUser":
        this.addEntity((msg as ServerJoinMessage).player);
        break;
      case "userLeftServer":
        this.removeEntity((msg as ServerPlayerLeftMessage).playerID);
        break;
      case "serverError":
        console.warn((msg as ServerErrorMessage).errormessage);
        break;
    }
  };

  update = (deltaTime: number) => {
    this.sceneSystems.forEach((system: any) => {
      system.update(deltaTime / 1000, 0, this.entities);
    });
  };

  stateUpdate(state: any) {
    if (this.firstUpdate) {
      this.firstUpdate = false;
      console.log(state);

      state.players.forEach((player: any) => {
        this.addEntity(player);
      });
    }
  }

  addEntity = (newPlayer: any) => {
    console.log("ADDING ENTITY: ", newPlayer);

    this.entities.push(PlayerEntity.create(newPlayer.id, newPlayer.position));
  };

  removeEntity = (playerID: string) => {
    //find Index of player
    const playerIndex = this.entities.findIndex((plr: any) => {
      plr.id == playerID;
    });
    if (playerIndex >= 0) {
      this.entities.splice(playerIndex, 1);
    }
  };
}
