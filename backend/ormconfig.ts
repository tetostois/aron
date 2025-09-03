import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

// Configuration pour TypeORM CLI (pour les migrations)
const cliConfig = {
  type: 'mysql' as const,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_DATABASE || 'aron',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

// Configuration pour l'application NestJS
const config: TypeOrmModuleOptions = {
  ...cliConfig,
  synchronize: process.env.NODE_ENV !== 'production', // Ne pas utiliser en production
  logging: process.env.NODE_ENV === 'development',
  migrationsRun: false, // Désactiver l'exécution automatique des migrations
};

export = config;
