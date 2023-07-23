// UI Component
import { Component } from "../../_Squeleto/ECS/component";

// you can define the incoming types when the component is created
export interface ILobbyUIComponent {
  someproperty: LobbyUIType;
}
export type LobbyUIType = string;

// this is the exported interface that is used in systems modules
export interface LobbyUIComponent {
  someproperty: LobbyUIType;
}

// classes should have:
// if UI element, a template property with the peasy-ui template literal
// if no UI aspect to the system, do not define a template
// a 'value' property that will be attached to the entity
export class LobbyUIComp extends Component {
  // UI template string literal with UI binding of value property
  setGamePublic = () => {
    window.alert("clicked");
  };
  public template = `
  <style>
  .LoginGrid{
    display: grid;
    grid-template-columns: 10px 1fr 1fr 1fr 1fr 1fr 10px;
    grid-template-rows: 10px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 10px;
    row-gap:3px;
    column-gap: 3px;
    width: 100%;
    height: 100%;
    
  }
  .Title{
    border: 1px solid white;
    border-radius: 3px;
    grid-column-start: 2;
    grid-column-end: 7;
    grid-row-start: 2;
    grid-row-end: 3;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }
  .openGames{
    font-size: x-small;
    border: 1px solid white;
    border-radius: 3px;
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row-start: 3;
    grid-row-end: 9;
    overflow-y: scroll; 
  }
  .createGame{
    border: 1px solid white;
    border-radius: 3px;
    grid-column-start: 5;
    grid-column-end: 7;
    grid-row-start: 3;
    grid-row-end: 7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 8px;
    padding-top:3px;
    padding-bottom: 2px;
  }
  .JoinGame{
    width: 100%;
    border: 1px solid white;
    border-radius: 3px;
    grid-column-start: 5;
    grid-column-end: 7;
    grid-row-start: 7;
    grid-row-end: 9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  .joinGameInput{
    width: 100px;
  }

  .createGameButtons{
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .lbyButton{
    border: 1px solid white;
    border-radius: 5000px;
    padding-left: 4px;
    padding-right: 4px;
    font-size: small;
  }
  .lbyButton:hover,
  .lbySelect:hover{
    box-shadow: 0px 0px 3px 3px rgba(255,255,255,0.75);
    cursor: pointer;
  }
  .lbyButton.disabled:hover{
    cursor: not-allowed;
    border: 1px solid #333333;
    color: #333333;
  }

  .lbyFlip{
    background-color: white;
    color: black;

  }

  .opengame{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 94%;
    margin: 2.5px;
    border: 0.5px solid white;
    font-size: 0.4vw;
    gap: 2px;
    padding-left: 2px;
    padding-right: 2px;
  }
  .lbyServerdata{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .titleblock{
    width: 94%;
    display:flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.4vw;
    background-color: #333333;
    margin: 2.5px;
    padding-left: 2px;
    padding-right: 4px;
  }

  .disabled{
    cursor: not-allowed;
  }

  .smallbutton{
    width: 20%; 
    font-size: xx-small;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }


</style>
  
  <div class="LoginGrid">
      <div class="Title"><div>SQUELETO DEMO 3</div></div>
      <div class="openGames">
        <div \${click@=>refreshLobbies} style="cursor: pointer">Public Games - refresh</div>
        <div class="titleblock">
          <div class="titleblockID">Room ID</div>
          <div class="titleblockPlayers">Spots Free</div>
          <div class="titleblockServer">Server Deets</div>
          <div class="titleblockJoin">Join</div>
        </div>
        <div \${!==isLobbiesEmpty}>
          <div class='opengame' \${opengame<=*openGames}>
            <div class="lbyRoomID">
            \${opengame.roomId}
            </div>  
            <div class="">
              \${opengame.numPlayers}/\${opengame.playerCap}
            </div>  
            <div class="lbyServerdata">
              <div style="display: flex; justify-content: space-evenly; align-items: center; gap: 3px;">
                  <div>\${opengame.server}</div>
                  <div>\${opengame.started}</div>
              </div>
              <div>Owner: \${opengame.owner}</div>  
            </div>  
            <div class="">
              <div class="lbyButton" \${click@=>joinPublicGame}>Join</div>
            </div>  
          
          </div>
        </div>
        <div class='opengame' \${===isLobbiesEmpty}>
          <div style="text-align: center; padding: 4px;"> There are no public games available, please login and create a new game!</div>  
        </div>
      </div>
      <div class="createGame">
        <div class="createGameButtons">
          <div class="lbyButton \${publicActiveCSS}" \${click@=>setGamePublic} >Public</div>
          <div class="lbyButton \${privateActiveCSS}" \${click@=>setGamePrivate}>Private</div>
        </div>
        
          <select class="lbySelect" name="server" id="server">
            <option value="Seattle">Seattle</option>
            <option value="Washington_DC">Washingon DC</option>
            <option value="Chicago" selected>Chicago</option>
            <option value="London">London</option>
            <option value="Frankfurt">Frankfurt</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Singapore">Singapore</option>
            <option value="Tokyo">Tokyo</option>
            <option value="Sydney">Sydney</option>
            <option value="Sao_Paulo">Sao Paulo</option>
          </select>
          <select \${==>playerCap} class="lbySelect" name="player" id="player">
            <option value="1">1 Player</option>
            <option value="2">2 Players</option>
            <option value="3">3 Players</option>
          </select>
          <div class="lbyButton" \${click@=>login}>Login</div>
          <div class="lbyButton \${disableStatus}" \${click@=>createGame} >Create Game</div>
        
      </div>
      <div class="JoinGame">
        <div> Join Game </div>
        <div style="display: flex; width: 100%; justify-content:space-evenly;">
          <input class="joinGameInput"  style="width: 55%;" \${==>roomJoinInput}></input>
          <div class="lbyButton smallbutton" \${click@=>joinRoom}>Join</div>
        </div>
      </div>
  </div>
    

    `;

  //setting default value
  public value = "";
  public constructor() {
    //@ts-ignore
    super("HUD", LobbyUIComp, true);
  }

  public define(data: string): void {
    if (data == null) {
      return;
    }
    console.log("i made it here", data);

    this.value = data;
  }
}
