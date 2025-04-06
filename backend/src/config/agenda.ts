import { Agenda } from "agenda";
import dotenv from "dotenv"
dotenv.config()

const mongoConnectionString = process.env.DATABASE_URL;

export const agenda = new Agenda({
  db: { address: mongoConnectionString, collection: "agenda-jobs" },
  processEvery: "1 minute",
  defaultConcurrency: 5,
  defaultLockLifetime: 10000,
});
