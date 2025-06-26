import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export interface Env {
  DB: D1Database;
}

export function createDB(db: D1Database) {
  const client = drizzle(db, { schema });
  return client;
}
