//Library
import "./style.css";
import { SceneManager } from "../_Squeleto/Scene";
import { LoadComponents } from "./Components/_components";

//Scenes
import { Lobby } from "./Scenes/lobby";

//Components
LoadComponents();

//Load Scenes
let sceneMgr = new SceneManager();
sceneMgr.register(Lobby);
sceneMgr.set("lobby");
