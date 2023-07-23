// UI SYSTEM
import { Entity } from "../../_Squeleto/ECS/entity";
import { System } from "../../_Squeleto/ECS/system";
import { LobbyUIComponent } from "../Components/lobbyUI";

// type definition for ensuring the entity template has the correct components
// ComponentTypes are defined IN the components imported
export type LobbyEntity = Entity & LobbyUIComponent; // & ComponentType2.... etc

export class LobbySystem extends System {
  public constructor() {
    super("lobbyUI");
  }

  public processEntity(entity: LobbyEntity): boolean {
    // return the test to determine if the entity has the correct properties
    // return entity.position != null && entity.velocity != null; for example demostrates that only
    // entities that have position and velocity properties can use this system
    // return true for bypassing this
    return true;
  }

  // update routine that is called by the gameloop engine
  public update(deltaTime: number, now: number, entities: LobbyEntity[]): void {
    entities.forEach(entity => {
      // This is the screening for skipping entities that aren't impacted by this system
      if (!this.processEntity(entity)) {
        return;
      }
      // insert code here on how you want to manipulate the entity properties
    });

    //since this isn't entity dependent...
    //update code here
  }
}
