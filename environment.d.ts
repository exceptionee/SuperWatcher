declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      UNIVERSE_ID: string;
    }
  }
}

export {}