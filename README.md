# Food Delivery App

Application de livraison de nourriture au Cameroun avec NestJS (backend) et Next.js (frontend).

## 🚀 Fonctionnalités

- **Authentification** des utilisateurs (inscription, connexion, JWT)
- **Gestion des restaurants** (CRUD complet)
- **Gestion des repas** (CRUD associés à un restaurant)
- **Passation de commandes** avec suivi en temps réel
- Interface utilisateur moderne et réactive
- Documentation de l'API avec Swagger

## 📋 Prérequis

- Node.js (v16+)
- npm ou yarn
- MySQL (v8.0+)
- NestJS CLI (pour le backend)
- Next.js (pour le frontend)

## 🛠 Installation

### 1. Configuration de la base de données

1. Créez une base de données MySQL nommée `food_delivery`
2. Configurez les variables d'environnement en copiant les fichiers d'exemple :

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend (à créer plus tard)
# cp frontend/.env.example frontend/.env.local
```

### 2. Backend (NestJS)

```bash
# Accéder au répertoire backend
cd backend

# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm run start:dev
```

L'API sera disponible à l'adresse : http://localhost:3000
Documentation Swagger : http://localhost:3000/api

### 3. Frontend (Next.js)

```bash
# Accéder au répertoire frontend
cd ../frontend

# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm run dev
```

L'application sera disponible à l'adresse : http://localhost:3001

## 🔧 Variables d'environnement

### Backend (`.env`)

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=food_delivery

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=3600

# App
PORT=3000
NODE_ENV=development
```

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Food Delivery
```

## 📦 Structure du projet

```
food-delivery-app/
├── backend/               # API NestJS
│   ├── src/
│   │   ├── auth/         # Authentification
│   │   ├── common/       # Utilitaires partagés
│   │   ├── meals/        # Gestion des repas
│   │   ├── orders/       # Gestion des commandes
│   │   ├── restaurants/  # Gestion des restaurants
│   │   └── users/        # Gestion des utilisateurs
│   └── ...
└── frontend/             # Application Next.js
    ├── public/
    ├── src/
    │   ├── components/   # Composants réutilisables
    │   ├── pages/        # Pages de l'application
    │   ├── services/     # Appels API
    │   └── styles/       # Styles globaux
    └── ...
```

## 🧪 Tests

### Backend

```bash
# Lancer les tests unitaires
npm run test

# Lancer les tests e2e
npm run test:e2e

# Couverture de test
npm run test:cov
```

## 🚀 Déploiement

### Backend

1. Construire l'application :
   ```bash
   npm run build
   ```

2. Configurer les variables d'environnement pour la production

3. Démarrer le serveur en production :
   ```bash
   npm run start:prod
   ```

### Frontend

1. Construire l'application :
   ```bash
   npm run build
   ```

2. Démarrer le serveur de production :
   ```bash
   npm start
   ```

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [NestJS](https://nestjs.com/) - Le framework Node.js progressif
- [Next.js](https://nextjs.org/) - Le framework React pour les applications web
- [TypeORM](https://typeorm.io/) - ORM pour TypeScript et JavaScript
