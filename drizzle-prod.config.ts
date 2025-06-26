/**
 * Connection info for production database
 */

import type { Config } from 'drizzle-kit';

export default {
  schema: "./src/lib/db/schema.ts",
  dialect: "sqlite",
  out: "./src/lib/db/migrations",
  driver: "d1-http",
  dbCredentials: {
    accountId: "1a0900a131529312bd9ad335375dcbf8",
    databaseId: "37eb0a10-2770-452a-ab96-fdf14537926c",
    token: "0nmUG57YtDw_8EvRvcUNykRPbybTasEMldrErgXx",
  },
} satisfies Config;
