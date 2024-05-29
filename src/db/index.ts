import {drizzle} from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import {envVars} from '../lib/environments';

const {DB_PATH} = envVars;

const sqlite = new Database(DB_PATH);

export const db = drizzle(sqlite);
