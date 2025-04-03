export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      SALT: string;
      PORT:string;
      JWT_SECRET:string;
    }
  }
}