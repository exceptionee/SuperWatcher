import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../structure/Command';
import { service } from '../utils';
import { EmbedBuilder } from '@discordjs/builders';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('like-ratio')
    .setDescription('Gives the like to dislike ratio of Shredding Incremental.'),
  async onCommandInteraction(interaction) {
    service.fetchVotes().then(data => {
      const totalVotes = data.upVotes + data.downVotes;
      const likePercent = Math.round(data.upVotes / totalVotes * 100);
      const dislikePercent = 100 - likePercent;

      interaction.reply({
        embeds: [
          new EmbedBuilder({
            color: 0xFF3333,
            title: 'Like Ratio',
            fields: [
              { name: 'Likes', value: `${likePercent}%`, inline: true },
              { name: 'Dislikes', value: `${dislikePercent}%`, inline: true }
            ]
          })
        ]
      });
    });
  },
} satisfies Command;