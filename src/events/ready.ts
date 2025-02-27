import { ActivityType, Client, Routes } from 'discord.js';
import { Listener } from '../structure/Listener';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

module.exports = {
  once: true,
  async execute(client: Client) {
    if (process.env.NODE_ENV == 'production') {
			const commands = [];

			for (const file of fs.readdirSync(path.resolve('src', 'commands'))) {
				commands.push(
					(await import(pathToFileURL(path.resolve('src', 'commands', file)).href)).default.data
				);
			}

			// Registers the commands
			client.rest.put(Routes.applicationCommands(client.application.id), { body: commands });
		}

    // Sets the bots activity and accent color
    client.user.setActivity('Shredding Incremental', { type: ActivityType.Watching });
    client.user.accentColor = 0xFF3333;

		console.log(`[${new Date().toISOString()}] Bot logged in`);
  }
} satisfies Listener;