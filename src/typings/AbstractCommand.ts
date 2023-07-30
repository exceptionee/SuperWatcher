import { SlashCommandBuilder } from "discord.js";

export abstract class AbstractCommand { // abstract command class that stores basic info all command class need

   protected slashCommand = new SlashCommandBuilder(); // the SlashCommandBuilder representation of the command

   private name: string;
   private description: string;

   protected constructor(name: string, description: string) {

      this.name = name;
      this.description = description;
      this.slashCommand.setName(name)
         .setDescription(description);

   }

   getName(): string {

      return this.name;

   }

   getDescription(): string {

      return this.description;

   }

   build(): SlashCommandBuilder { // returns the SlashCommandBuilder representation of this command

      return this.slashCommand;

   }

}