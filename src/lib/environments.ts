import dotenv from 'dotenv';
import {EnvironmentDefs} from '../definitions';
dotenv.config();

export const envVars: EnvironmentDefs = {
  PORT: process.env.PORT || 5055,
  DB_PATH: process.env.DB_PATH || 'store.db',
  ALLOWED_HOSTS: process.env.ALLOWED_HOSTS
    ? process.env.ALLOWED_HOSTS.split(',')
    : ['http://localhost:3000', 'https://syntaxpunk.com'],
  API_KEY: process.env.API_KEY || '',
  AUTH_DOMAIN: process.env.AUTH_DOMAIN || '',
  PROJECT_ID: process.env.PROJECT_ID || '',
  STORAGE_BUCKET: process.env.STORAGE_BUCKET || '',
  MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID || '',
  APP_ID: process.env.APP_ID || '',
} as const;
