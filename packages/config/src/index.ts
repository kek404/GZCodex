import { config as loadEnv } from 'dotenv';

export interface EchoConfig {
  nodeEnv: string;
  databaseUrl: string;
}

export function loadConfig(): EchoConfig {
  loadEnv({ path: '.env.local', override: false });
  const databaseUrl = process.env.DATABASE_URL ?? 'postgres://echo:echo@localhost:5432/echo';
  return {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    databaseUrl
  };
}
