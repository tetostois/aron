"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
(0, dotenv_1.config)({ path: (0, path_1.resolve)(__dirname, '../.env') });
const AppDataSource = new typeorm_1.DataSource({
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
    }
    else {
        console.log('Aucune nouvelle migration à appliquer');
    }
    process.exit(0);
})
    .catch(error => {
    console.error('Erreur lors de l\'exécution des migrations :', error);
    process.exit(1);
});
//# sourceMappingURL=run-migrations.js.map