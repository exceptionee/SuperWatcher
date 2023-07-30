import { ParentCommand } from "../typings/ParentCommand";
import { GameInfo } from "./GameInfo";
import { GameStats } from "./GameStats";

export class Game extends ParentCommand {

   public constructor() {

      super("game", "Commands related to Shredding Incremental.", new GameInfo(), new GameStats());

   }

}