import { HathoraClient, HathoraConnection, ConnectionDetails } from "@hathora/client-sdk";
import { AuthV1Api, LobbyV2Api, Region, RoomV1Api } from "@hathora/hathora-cloud-sdk";

export const LOCAL_CONNECTION_DETAILS: ConnectionDetails = {
  host: "localhost",
  port: 9000,
  transportType: "tcp" as const,
};

export type Regions = Region;
export type GameScope = "public" | "private" | "local";

export type User = {
  token?: string;
  userdata?: UserData;
};

export type UserData = object & {
  id: string;
  type?: string;
  name?: string;
  iat?: number;
};

export enum AuthenticationType {
  anonymous = "anon",
}

export class MultiPlayerInterface {
  lobbyClient = new LobbyV2Api();
  authClient = new AuthV1Api();
  roomClient = new RoomV1Api();
  token: string | null = null;
  connection: HathoraConnection | undefined;
  appID: string;
  roomID: string | undefined;
  currentRoom: string = "";
  authTypes: Array<AuthenticationType>;
  //portnum: number;
  public updateCallback: Function | undefined | null;
  matchScope: GameScope;

  userdata: UserData = {
    id: "",
  };

  constructor(
    app_id: string,
    stateUpdateCallback: Function,
    portNum?: number | undefined | null,
    AuthTypes?: Array<AuthenticationType>,
    local?: boolean
  ) {
    /* let connectionInfo;
    this.portnum = portNum || 9000;

    if (local) connectionInfo = { host: "localhost", port: this.portnum, transportType: "tcp" as const };
    else connectionInfo = undefined; //cloud */

    this.authTypes = AuthTypes as Array<AuthenticationType>;
    this.appID = app_id;
    this.connection = undefined;
    this.updateCallback = stateUpdateCallback;
    if (local) this.matchScope = "local";
    else this.matchScope = "public";
    console.log("mulitplayer interface: ***********************************************************");
    console.log("auth client: ", this.authClient);
    console.log("room client: ", this.roomClient);
    console.log("lobby client: ", this.lobbyClient);
  }

  async login() {
    this.token = sessionStorage.getItem("token");
    if (!this.token) {
      let { token } = await this.authClient.loginAnonymous(this.appID);
      if (token) this.token = token;
      sessionStorage.setItem("token", this.token as string);
      if (this.token) this.userdata = HathoraClient.getUserFromToken(this.token);
    } else {
      if (this.token) this.userdata = HathoraClient.getUserFromToken(this.token);
    }

    let rslt: User = {
      token: this.token as string,
      userdata: this.userdata,
    };

    console.log("User Login: ***********************************************************************");
    console.log("User Token: ", this.token);
    console.log("UserID: ", this.userdata.id);
    console.log("User type: ", this.userdata.type);
    console.log("Username: ", this.userdata.name);

    return rslt;
  }

  async getPublicLobbies() {
    let lobbies;
    if (this.token) {
      lobbies = await this.lobbyClient.listActivePublicLobbies(this.appID);
      return lobbies;
    }
  }

  async createRoom(publicRoom: GameScope, region: Region, config: object) {
    if (this.matchScope != "local") this.matchScope = publicRoom;
    if (this.token) {
      let { roomId } = await this.lobbyClient.createLobby(
        this.appID, // your Hathora application id
        this.token, // signed player token (see "Authenticate Players" section)
        {
          visibility: this.matchScope,
          region: region,
          initialConfig: config,
        }
      );
      this.roomID = roomId;
    }
    console.log("Rooom SETUP ***********************************************************");
    console.log("roomid: ", this.roomID);

    return this.roomID;
  }

  async sendMessage(type: string, data: string) {
    this.connection?.writeJson({
      type: type,
      msg: data,
    });
  }

  onClose = (e: any) => {
    console.log("HATHORA CONNECTION FAILURE");
    console.log(`error:`, e);
  };

  getJSONmsg = (msg: any) => {
    //console.log("getting message", msg, this.updateCallback);
    if (this.updateCallback != undefined) this.updateCallback(msg);
  };

  async enterRoom(roomId: string) {
    console.log("Rooom change ***********************************************************");
    console.log("Entering: ", this.roomID);

    let connectionInfo;
    if (this.matchScope == "local") {
      connectionInfo = LOCAL_CONNECTION_DETAILS;
    } else {
      connectionInfo = await this.roomClient.getConnectionInfo(
        this.appID, // your Hathora application id
        roomId
      );
    }

    if (connectionInfo) {
      this.connection = new HathoraConnection(roomId, connectionInfo);
      this.currentRoom = roomId;
      console.log(this.connection);
      this.connection.onMessageJson(this.getJSONmsg);
      this.connection.onClose(this.onClose);
      await this.connection.connect(this.token as string);
    }
  }

  async leaveRoom() {
    if (this.connection) {
      this.connection.disconnect();
      this.currentRoom = "";
    }
  }
}
