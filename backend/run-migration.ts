import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Charger les variables d'environnement
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Créer une nouvelle connexion à la base de données
const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
});

// Exécuter la migration
async function runMigrations() {
  try {
    console.log('Initialisation de la connexion à la base de données...');
    await AppDataSource.initialize();
    console.log('Connexion à la base de données établie avec succès');
    
    console.log('Démarrage des migrations...');
    const migrations = await AppDataSource.runMigrations();
    
    if (migrations.length > 0) {
      console.log('Migrations appliquées avec succès :');
      migrations.forEach(migration => {
        console.log(`- ${migration.name}`);
      });
    } else {
      console.log('Aucune nouvelle migration à appliquer');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de l\'exécution des migrations :', error);
    process.exit(1);
  }
}

runMigrations();
