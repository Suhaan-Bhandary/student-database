// Override the default interface
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DATABASE_URL: string;
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      SESSION_SECRET: string;
    }
  }
}

// To make this file a module
export {};
