/**
 * Connection info for local database
 */

import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/schema.ts",
  dialect: "sqlite",
  out: "./src/lib/db/migrations",
  dbCredentials: {
    url: ".wrangler/state/v3/d1/miniflare-D1DatabaseObject/acde1661a7a664566967c7c8a869913b8f01a3cedf143068939e41aac3244a94.sqlite",
  },
} satisfies Config;
