import { AbstractCommand } from "./AbstractCommand";
import { Command } from "./Command";

export abstract class ParentCommand extends AbstractCommand {

   private children: Command[] = [];
   
   protected constructor(name: string, description: string, ...children: Command[]) {

      super(name, description);
      for (const child of children) {

         if (child.getParent() == null) {

            this.children.push(child);
            child.setParent(this);
            this.slashCommand.addSubcommand(child.buildSubCommand());

         }

      }

   }

   getChildren(): Command[] {
      
      return this.children;

   }

}