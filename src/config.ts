import dotenv from 'dotenv';

dotenv.config();

interface Environment {
  PORT: string;
}

class Config {
  private static instance: Config;

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }

    return Config.instance;
  }

  get(key: keyof Environment): string {
    if (!process.env[key]) console.warn(`Missing environment variable: ${ key }`);

    return <string> process.env[key];
  }
}

export const config = Config.getInstance();
