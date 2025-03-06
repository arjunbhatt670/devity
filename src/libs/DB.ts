import path from 'node:path';
import * as schema from '@/models/Schema';
import { drizzle as drizzlePg, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate as migratePg } from 'drizzle-orm/node-postgres/migrator';
import { Client } from 'pg';
import { Env } from './Env';

let client;
let drizzle;

if (Env.DATABASE_URL) {
  client = new Client({
    connectionString: Env.DATABASE_URL,
  });
  await client.connect();

  drizzle = drizzlePg(client, { schema });
  await migratePg(drizzle, {
    migrationsFolder: path.join(process.cwd(), 'migrations'),
  });
}

export const db = drizzle as (NodePgDatabase<typeof schema> & {
  $client: Client;
});
