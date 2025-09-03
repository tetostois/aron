# Food Delivery API

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white)](https://swagger.io/)
[![TypeORM](https://img.shields.io/badge/TypeORM-262627?style=for-the-badge&logo=typeorm&logoColor=white)](https://typeorm.io/)

API pour une application de livraison de nourriture au Cameroun, développée avec NestJS, TypeScript et MySQL.

## 🚀 Fonctionnalités

- **Authentification** (JWT) avec inscription et connexion
- Gestion des **utilisateurs** (CRUD complet)
- Gestion des **restaurants** (CRUD complet avec géolocalisation)
- Gestion des **repas** (CRUD avec catégories et disponibilité)
- Gestion des **commandes** avec suivi en temps réel
- Documentation complète de l'API avec Swagger
- Validation des données avec class-validator
- Gestion des migrations de base de données

## 🛠 Prérequis

- Node.js (v16+)
- npm ou yarn
- MySQL (v8.0+)
- NestJS CLI (optionnel)

## 🚀 Installation

1. **Cloner le dépôt**
   ```bash
   git clone [URL_DU_REPO]
   cd food-delivery-app/backend
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer l'environnement**
   ```bash
   cp .env.example .env
   ```
   
   Modifiez le fichier `.env` avec vos paramètres :
   - `DB_*` : Paramètres de connexion à la base de données MySQL
   - `JWT_SECRET` : Une clé secrète pour la signature des tokens JWT
   - `JWT_EXPIRES_IN` : Durée de validité des tokens JWT (ex: '24h')
   - `PORT` : Port sur lequel le serveur doit écouter (par défaut 3000)

4. **Configurer la base de données**
   - Créez une base de données MySQL vide
   - Mettez à jour les informations de connexion dans `.env`

5. **Exécuter les migrations**
   ```bash
   npm run migration:run
   ```

5. **Lancer l'application**
   ```bash
   # Mode développement
   npm run start:dev
   
   # Ou en production
   npm run build
   npm run start:prod
   ```

## 📚 Documentation de l'API

Une fois l'application démarrée, accédez à la documentation Swagger :
- **Développement** : http://localhost:3000/api
- **Production** : http://votre-domaine.com/api

## 🗄️ Migrations

### Créer une nouvelle migration
```bash
npm run migration:create --name=NomDeLaMigration
```

### Exécuter les migrations
```bash
npm run migration:run
```

### Annuler la dernière migration
```bash
npm run migration:revert
```

## 🧪 Tests

```bash
# Lancer les tests unitaires
npm test

# Lancer les tests e2e
npm run test:e2e

# Couverture de test
npm run test:cov
```

## 🏗 Structure du projet

```
src/
├── auth/               # Authentification (JWT)
│   ├── dto/           # DTOs pour l'authentification
│   ├── guards/        # Guards d'authentification
│   ├── strategies/    # Stratégies d'authentification
│   └── auth.module.ts
├── common/            # Utilitaires partagés
├── meals/             # Gestion des repas
│   ├── dto/          # DTOs pour les repas
│   ├── entities/     # Entités TypeORM
│   └── meals.module.ts
├── orders/           # Gestion des commandes
│   ├── dto/         # DTOs pour les commandes
│   ├── entities/    # Entités TypeORM
│   └── orders.module.ts
├── restaurants/      # Gestion des restaurants
│   ├── dto/        # DTOs pour les restaurants
│   ├── entities/   # Entités TypeORM
│   └── restaurants.module.ts
├── users/           # Gestion des utilisateurs
│   ├── dto/       # DTOs pour les utilisateurs
│   ├── entities/  # Entités TypeORM
│   └── users.module.ts
└── app.module.ts    # Module racine
```

## 🔧 Configuration de la base de données

### Variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# Configuration de la base de données
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=votre_mot_de_passe
DB_DATABASE=food_delivery

# Configuration JWT
JWT_SECRET=votre_secret_jwt
JWT_EXPIRES_IN=3600

# Configuration de l'application
PORT=3000
NODE_ENV=development
```

### Création de la base de données

1. Connectez-vous à MySQL :
   ```bash
   mysql -u root -p
   ```

2. Créez la base de données :
   ```sql
   CREATE DATABASE food_delivery CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. Exécutez les migrations :
   ```bash
   npm run migration:run
   ```

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [NestJS](https://nestjs.com/) - Le framework Node.js progressif
- [TypeORM](https://typeorm.io/) - ORM pour TypeScript et JavaScript
- [Swagger](https://swagger.io/) - Documentation d'API interactive

```bash
src/
├── auth/               # Authentification et autorisation
├── common/             # Utilitaires partagés
├── meals/              # Gestion des repas
├── orders/             # Gestion des commandes
├── restaurants/        # Gestion des restaurants
└── users/              # Gestion des utilisateurs
```

## Variables d'environnement
With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
