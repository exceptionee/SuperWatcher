import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../structure/Command';
import { EmbedBuilder } from '@discordjs/builders';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Pings the bot.'),
  async onCommandInteraction(interaction) {
    interaction.reply({
      embeds: [
        new EmbedBuilder({
          color: 0xFF3333,
          title: 'Ping',
          fields: [
            { name: 'Ping', value: `${interaction.client.ws.ping}ms`, inline: true },
            { name: 'Up Since', value: `<t:${Math.trunc(Date.now() / 1000 - interaction.client.uptime / 1000)}:R>` }
          ]
        })
      ]
    });
  },
} satisfies Command;