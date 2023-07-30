import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../typings/Command";
import { Embed } from "../typings/Embed";

export class Ping extends Command {

   public constructor() {

      super("ping", "Pings the bot.");

   }

   async onCommandInteraction(event: ChatInputCommandInteraction) {
      
      await event.reply({embeds: [new Embed({color: 0xFF3333, title: "Ping"}).addFields(
         {name: "Ping", value: event.client.ws.ping + "ms", inline: true},
         {name: "Up Since", value: "<t:" + Math.trunc(Date.now() / 1000 - event.client.uptime / 1000) + ":R>"}
      )]});

   }

}