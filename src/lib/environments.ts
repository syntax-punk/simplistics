import dotenv from 'dotenv';
import {EnvironmentDefs} from '../definitions';
dotenv.config();

export const envVars: EnvironmentDefs = {
  PORT: process.env.PORT || 5055,
  DB_PATH: process.env.DB_PATH || '/data/store.db',
  ALLOWED_HOSTS: process.env.ALLOWED_HOSTS
    ? process.env.ALLOWED_HOSTS.split(',')
    : ['http://localhost:3000'],
};
