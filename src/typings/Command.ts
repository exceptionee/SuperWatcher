import { CommandInteraction, ApplicationCommandOptionBase, SlashCommandSubcommandBuilder } from "discord.js";
import { ParentCommand } from "./ParentCommand";
import { AbstractCommand } from "./AbstractCommand";

export abstract class Command extends AbstractCommand { // abstract class that represents all bottom level commands

   protected subCommand = new SlashCommandSubcommandBuilder(); // the SlashCommandSubcommandBuilder representation of the command

   private parent: ParentCommand | null = null;
   private options: ApplicationCommandOptionBase[] = [];

   protected constructor(name: string, description: string, ...options: ApplicationCommandOptionBase[]) {

      super(name, description);

      this.subCommand.setName(name)
         .setDescription(description);

      for (const option of options) {

         this.options.push(option);
         this.slashCommand.options.push(option);
         this.subCommand.options.push(option);
   
      }

   }

   abstract onCommandInteraction(event: CommandInteraction); // method called when the command is interacted with

   setParent(parent: ParentCommand) {

      if (this.parent == null && parent.getChildren().includes(this)) {

         this.parent = parent;

      }

   }

   getParent(): ParentCommand | null {

      return this.parent;

   }

   getFullName(): string {

      return (this.parent != null)? this.parent.getName() + " " + this.getName() : this.getName();

   }

   getOptions(): ApplicationCommandOptionBase[] {

      return this.options;

   }

   buildSubCommand(): SlashCommandSubcommandBuilder { // returns the SlashCommandSubcommandBuilder representation of this command

      return this.subCommand;

   }

}