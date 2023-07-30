import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../typings/Command";
import { service } from "../bot";
import { Embed } from "../typings/Embed";

export class GameInfo extends Command {

   public constructor() {

      super("info", "Gives information about Shredding Incremental.");

   }

   async onCommandInteraction(event: ChatInputCommandInteraction) {
      
      service.getGameData().then(async (data) => {

         await event.reply({embeds: [new Embed({color: 0xFF3333, title: "Game Info", description: data.description})]});

      });

   }

}