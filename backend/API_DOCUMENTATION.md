# Documentation de l'API Food Delivery

Bienvenue dans la documentation de l'API Food Delivery. Cette API permet de gérer des restaurants, des repas et des commandes pour une application de livraison de nourriture.

## Accès à la documentation Swagger

La documentation interactive de l'API est disponible via Swagger UI à l'adresse suivante lorsque le serveur est en cours d'exécution :

```
http://localhost:3000/api
```

## Authentification

La plupart des endpoints de l'API nécessitent une authentification. Pour vous authentifier :

1. Utilisez l'endpoint `/auth/login` pour obtenir un token JWT
2. Cliquez sur le bouton "Authorize" en haut à droite de la documentation Swagger
3. Entrez le token reçu au format : `Bearer votre-token-jwt`

## Points de terminaison principaux

### Authentification

- `POST /auth/login` - Se connecter et obtenir un token JWT
- `POST /auth/register` - Créer un nouveau compte utilisateur
- `GET /auth/profile` - Obtenir le profil de l'utilisateur connecté

### Restaurants

- `GET /restaurants` - Lister tous les restaurants (avec filtres)
- `GET /restaurants/:id` - Obtenir les détails d'un restaurant
- `POST /restaurants` - Créer un nouveau restaurant (admin/restaurateur)
- `PUT /restaurants/:id` - Mettre à jour un restaurant (admin/propriétaire)
- `DELETE /restaurants/:id` - Supprimer un restaurant (admin/propriétaire)

### Repas

- `GET /meals` - Lister tous les repas (avec filtres)
- `GET /meals/restaurant/:restaurantId` - Lister les repas d'un restaurant
- `GET /meals/:id` - Obtenir les détails d'un repas
- `POST /meals` - Créer un nouveau repas (admin/restaurateur)
- `PUT /meals/:id` - Mettre à jour un repas (admin/restaurateur)
- `DELETE /meals/:id` - Supprimer un repas (admin/restaurateur)

### Commandes

- `GET /orders` - Lister les commandes (avec filtres)
- `GET /orders/user/current` - Obtenir les commandes de l'utilisateur connecté
- `GET /orders/restaurant/:restaurantId/active` - Obtenir les commandes actives d'un restaurant
- `GET /orders/:id` - Obtenir les détails d'une commande
- `POST /orders` - Créer une nouvelle commande
- `PUT /orders/:id/status` - Mettre à jour le statut d'une commande

## Codes de statut HTTP

L'API utilise les codes de statut HTTP standard :

- `200 OK` - Requête réussie
- `201 Created` - Ressource créée avec succès
- `204 No Content` - Pas de contenu à renvoyer
- `400 Bad Request` - Requête mal formée ou invalide
- `401 Unauthorized` - Authentification requise
- `403 Forbidden` - Droits insuffisants
- `404 Not Found` - Ressource non trouvée
- `409 Conflict` - Conflit (ex: email déjà utilisé)
- `422 Unprocessable Entity` - Erreur de validation
- `429 Too Many Requests` - Trop de requêtes
- `500 Internal Server Error` - Erreur serveur

## Pagination

Les endpoints de liste prennent en charge la pagination avec les paramètres suivants :

- `page` - Numéro de page (par défaut: 1)
- `limit` - Nombre d'éléments par page (par défaut: 10, max: 50)

Exemple de réponse paginée :

```json
{
  "data": [
    // Tableau d'éléments
  ],
  "meta": {
    "total": 42,
    "page": 1,
    "pageSize": 10,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

## Filtrage et tri

### Filtres communs

- `isAvailable` - Filtre par disponibilité (true/false)
- `minPrice` / `maxPrice` - Filtre par fourchette de prix
- `search` - Recherche textuelle

### Tri

La plupart des endpoints supportent le tri via le paramètre `sort` :

- `sort=field` - Tri croissant sur le champ spécifié
- `sort=-field` - Tri décroissant sur le champ spécifié

Exemple : `?sort=name` ou `?sort=-price`

## Gestion des erreurs

Les réponses d'erreur suivent le format suivant :

```json
{
  "statusCode": 400,
  "message": [
    "Le nom est requis",
    "Le prix doit être un nombre positif"
  ],
  "error": "Bad Request",
  "timestamp": "2023-10-01T12:00:00.000Z",
  "path": "/api/restaurants"
}
```

## Exemple de requête cURL

```bash
# Se connecter
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Récupérer la liste des restaurants
curl -X GET http://localhost:3000/restaurants \
  -H "Authorization: Bearer votre-token-jwt"

# Créer une commande
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer votre-token-jwt" \
  -d '{"restaurantId":"123e4567-e89b-12d3-a456-426614174000","items":[{"mealId":"456e7890-e89b-12d3-a456-426614174000","quantity":2}],"deliveryAddress":"123 Rue de la Paix, 75001 Paris"}'
```

## Environnements

- **Développement** : `http://localhost:3000`
- **Staging** : `https://api-staging.fooddelivery.com`
- **Production** : `https://api.fooddelivery.com`

## Support

Pour toute question ou problème, veuillez contacter l'équipe technique à support@fooddelivery.com
