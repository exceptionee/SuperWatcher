declare global {

   namespace NodeJS {

      interface ProcessEnv {

         token: string;
         universeId: string;
         guildId: string;
         channelId: string;

      }

   }

}

export {}