export type VisitRequestBody = {
  hostName: string;
  path: string;
};

export type VisitEntity = {
  hostname: string;
  path: string;
  timestamp: string;
};

export type EnvironmentDefs = {
  PORT: number | string;
  DB_PATH: string;
  ALLOWED_HOSTS: string[];
  API_KEY: string;
  AUTH_DOMAIN: string;
  PROJECT_ID: string;
  STORAGE_BUCKET: string;
  MESSAGING_SENDER_ID: string;
  APP_ID: string;
};
