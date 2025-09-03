import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { resolve } from 'path';

// Charger les variables d'environnement
config({ path: resolve(__dirname, '../.env') });

// Configuration de la source de données
const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
  logging: true,
});

// Exécuter les migrations
AppDataSource.initialize()
  .then(async () => {
    console.log('Connexion à la base de données établie avec succès');
    console.log('Exécution des migrations...');
    
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
  })
  .catch(error => {
    console.error('Erreur lors de l\'exécution des migrations :', error);
    process.exit(1);
  });
