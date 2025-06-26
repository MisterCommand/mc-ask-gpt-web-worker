/**
 * Connection info for local database
 */

import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/schema.ts",
  dialect: "sqlite",
  out: "./src/lib/db/migrations",
  dbCredentials: {
    url: ".wrangler/state/v3/d1/miniflare-D1DatabaseObject/110dd201db7f72e829f6965f1a2bf8a73e3ea4464c7436b6b8f451d293ed0430.sqlite",
  },
} satisfies Config;
