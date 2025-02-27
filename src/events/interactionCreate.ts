import { EmbedBuilder, Interaction, RepliableInteraction } from 'discord.js';
import { Listener } from '../structure/Listener';

module.exports = {
	async execute(interaction: Interaction) {
		if (interaction.isCommand()) {
			interaction.client.commands
				.find(command => interaction.commandName == command.data.name)
				.onCommandInteraction(interaction)
				.catch((error: Error) => reportError(error, interaction));
		}
	}
} satisfies Listener;

function reportError(e: Error, interaction: RepliableInteraction) {
  interaction.reply({
    embeds: [
      new EmbedBuilder({
        color: 0xFF3333,
        title: 'Error',
        description: e.message, 
        footer: { text: 'Please report this error to the developers.' }
      })
    ]
  });
  console.error(e.stack);
}