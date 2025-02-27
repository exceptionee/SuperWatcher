import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandBuilder } from 'discord.js';
import { Command } from '../structure/Command';
import { EmbedBuilder } from '@discordjs/builders';
import { service } from '../utils';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('game')
    .setDescription('Commands related to Shredding Incremental.')
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName('info')
        .setDescription('Gives information about Shredding Incremental.')
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName('stats')
        .setDescription('Gives the game\'s stats.')
    ),
  async onCommandInteraction(interaction: ChatInputCommandInteraction) {
    switch (interaction.options.getSubcommand()) {
      case 'info':
        service.fetchData().then(data => {
          interaction.reply({
            embeds: [
              new EmbedBuilder({
                color: 0xFF3333,
                title: 'Game Info',
                description: data.description
              })
            ]
          });
        });
        return;

      case 'stats':
        Promise.all([service.fetchData(), service.fetchVotes()]).then(([data, votes]) => {
          interaction.reply({
            embeds: [
              new EmbedBuilder({
                color: 0xFF3333,
                title: 'Game Stats',
                description: 'The current stats of Shredding Incremental.',
                fields: [
                  { name: 'Dislikes', value: `${votes.downVotes}`, inline: true },
                  { name: 'Playing', value: `${data.playing}`, inline: true },
                  { name: 'Visits', value: `${data.visits}`, inline: true },
                  { name: 'Favorites', value: `${data.favoritedCount}`, inline: true },
                  { name: 'Last Update', value: `<t:${getSecondsFromDate(data.updated)}>`, inline: true }
                ]
              })
            ]
          });
       });
    }
  },
} satisfies Command;

function getSecondsFromDate(time: string): number {
  const segments = time.split(/-|T|:|\./g); // Separates the time into segments such as year, month, day, etc.
  return new Date(parseInt(segments[0]), parseInt(segments[1]) - 1, parseInt(segments[2]),
    parseInt(segments[3]), parseInt(segments[4]), parseInt(segments[5])).valueOf() / 1000;
}