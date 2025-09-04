import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { envConfig } from './env.config';

// Configuration pour TypeORM CLI (pour les migrations)
const cliConfig = {
  type: 'mysql' as const,
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT,
  username: envConfig.DB_USERNAME,
  password: envConfig.DB_PASSWORD,
  database: envConfig.DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  logging: envConfig.NODE_ENV === 'development',
  synchronize: envConfig.NODE_ENV !== 'production',
  migrationsRun: false,
};

// Configuration pour l'application NestJS
const config: TypeOrmModuleOptions = {
  ...cliConfig,
};

export = config;
