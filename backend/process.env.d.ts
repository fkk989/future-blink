export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      SALT: string;
      PORT: string;
      JWT_SECRET: string;
      SMTP_HOST: string;
      SMTP_PORT: string;
      SMTP_USER: string;
      SMTP_PASS: string;
      OTP_EXPIRY: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_PASSWORD: string;
      REDIS_USERNAME: string;
    }
  }
}