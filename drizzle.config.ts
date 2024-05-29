import {defineConfig} from 'drizzle-kit';
import {envVars} from './src/lib/environments';

const {DB_PATH} = envVars;

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/db/schema.ts',
  out: './src/db/drizzle',
  dbCredentials: {
    url: DB_PATH,
  },
});
