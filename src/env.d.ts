// Override the default interface
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DATABASE_URL: string;
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      SESSION_SECRET: string;

      ADMIN_NAME: string;
      ADMIN_PASSWORD: string;
    }
  }
}

// To make this file a module
export {};
