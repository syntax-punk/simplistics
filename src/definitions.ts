export type VisitRequestBody = {
  hostName: string;
  path: string;
};

export type EnvironmentDefs = {
  PORT: number | string;
  DB_PATH: string;
  ALLOWED_HOSTS: string[];
};
