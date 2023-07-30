import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../typings/Command";
import { service } from "../bot";
import { Embed } from "../typings/Embed";

export class GameStats extends Command {

   constructor() {

      super("stats", "Gives the games stats.");

   }

   async onCommandInteraction(event: ChatInputCommandInteraction) {

      Promise.all([service.getGameData(), service.getGameVotes()]).then(async ([data, votes]) => { // waits for the promises to resolve

         await event.reply({embeds: [new Embed({color: 0xFF3333, title: "Game Stats", description: "The current stats of Shredding Incremental."})
            .addFields({name: "Likes", value: `${votes.upVotes}`, inline: true},
               {name: "Dislikes", value: `${votes.downVotes}`, inline: true},
               {name: "Playing", value: `${data.playing}`, inline: true},
               {name: "Visits", value: `${data.visits}`, inline: true},
               {name: "Favorites", value: `${data.favoritedCount}`, inline: true},
               {name: "Last Update", value: "<t:" + this.getSecondsFromDate(data.updated) + ">", inline: true})]});

      });
      
   }

   private getSecondsFromDate(time: string): number {

      let segments = time.split(/-|T|:|\./g); // separates the time into segments such as year, month, day, etc.
      return new Date(parseInt(segments[0]), parseInt(segments[1]) - 1, parseInt(segments[2]),
         parseInt(segments[3]), parseInt(segments[4]), parseInt(segments[5])).valueOf() / 1000;

   }

}