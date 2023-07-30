import { Client, REST, Routes, GatewayIntentBits, SlashCommandBuilder, ChatInputCommandInteraction, ActivityType, TextChannel, DiscordAPIError } from "discord.js";
import { Command } from "./typings/Command";
import { ParentCommand } from "./typings/ParentCommand";
import { Embed } from "./typings/Embed";
import { Ping } from "./commands/Ping";
import { RobloxGameService } from "./services/RobloxGameService";
import { Game } from "./commands/Game";
import { LikeRatio } from "./commands/LikeRatio";
import { keepAlive } from "./server";

require('dotenv').config(); // configures dotenv module to be able to use env variables

let commands: Command[] = []; // commands array

const client = new Client({intents: GatewayIntentBits.GuildMembers | GatewayIntentBits.GuildPresences}); // discord client
const rest = new REST(); // rest instance
export const service = new RobloxGameService(process.env.universeId); // RobloxGameService instance

client.login(process.env.token); // logs in to discord with the bot token
rest.setToken(process.env.token); // sets the rests token to the bot token
keepAlive(); // starts the server

function registerCommands(...commandsToRegister: (Command | ParentCommand)[]) { // adds the commands to the commands array and updates the bots commands if neccessary

   let slashCommands: SlashCommandBuilder[] = [];

   for (const command of commandsToRegister) {

      slashCommands.push(command.build());

      if (command instanceof ParentCommand) {

         for (const subCommand of command.getChildren()) {

            commands.push(subCommand);

         }

      }

      else {

         commands.push(command);

      }

   }

   rest.put(Routes.applicationGuildCommands(client.application!.id, "1125512042892234853"), {body: slashCommands});

}

client.once("ready", async () => { // fires when the client is ready

   client.user.setActivity("Shredding Incremental", {type: ActivityType.Watching}); // sets the bots activity
   client.user.accentColor = 0xFF3333;
   registerCommands(new Game(), new LikeRatio(), new Ping()); // registers the commands
   console.log("Bot is ready!");
   
});

client.on("interactionCreate", async (interaction: ChatInputCommandInteraction) => {

   if (interaction.isCommand()) { // checks to see if the interaction is a command interaction

      const fullCommandName =
         (interaction.options.getSubcommand(false))? interaction.commandName + " " + interaction.options.getSubcommand() : interaction.commandName;

      for (const command of commands) {
   
         if (command.getFullName() == fullCommandName) { // checks to see if the commmand in the loop has the same name as the interacted one
   
            try {
   
               command.onCommandInteraction(interaction);
               
            }
   
            catch (error) { // catches any error and replies with an error message


               if (error !instanceof DiscordAPIError) {

                  interaction.reply({embeds: [new Embed({color: 0xFF3333, title: "Error", description: error.message, 
                     footer: {text: "Please report this error to the developers."}})]});
                  console.log(error.stack);

               }
   
            }
   
         }
   
      }

   }

   client.on("guildMemberAdd", member => { // fires when a member joins a server

      if (member.guild.id == process.env.guildId) { // checks if the member joined the Shredding Incremental server

         (member.guild.channels.cache.get(process.env.channelId) as TextChannel).send("Everyone welcome <@" + member.id + ">.");

      }

   });

   client.on("guildMemberRemove", member => { // fires when a member leaves a server

      if (member.guild.id == process.env.guildId) { // checks if the member left the Shredding Incremental server

         (member.guild.channels.cache.get(process.env.channelId) as TextChannel).send(member.displayName + " has left the server.");

      }

   });

});