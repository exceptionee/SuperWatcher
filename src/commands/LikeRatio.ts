import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../typings/Command";
import { service } from "../bot";
import { Embed } from "../typings/Embed";

export class LikeRatio extends Command {

   public constructor() {

      super("like-ratio", "Gives the like to dislike ratio of Shredding Incremental.");

   }

   async onCommandInteraction(event: ChatInputCommandInteraction) {

      service.getGameVotes().then(async (data) => {

         let totalVotes = data.upVotes + data.downVotes;
         let likePercent = Math.round(data.upVotes / totalVotes * 100);
         let dislikePercent = 100 - likePercent;

         await event.reply({embeds: [new Embed({color: 0xFF3333, title: "Like Ratio"}).addFields(
            {name: "Likes", value: `${likePercent}%`, inline: true},
            {name: "Dislikes", value: `${dislikePercent}%`, inline: true})]});

      });

   }

}