export interface ILobbyConfig {
  name: string;
}

export class LobbyUI {
  public template = `
  <style>
    .HUD{
        width: 100%;
        height: 100%;
    }
  </style>

  <lobby-UI class="HUD">
        <div>
            Hello \${name}
        </div>
  </lobby-UI>
  `;

  private constructor(public name: string) {
    console.log("Lobby:", this);
  }

  public static create(config: ILobbyConfig): LobbyUI {
    return new LobbyUI(config.name);
  }

  public update() {}
}
