# restaurant-microservices

## Description du projet

Ce projet est une application de microservices pour la gestion d'un restaurant. Il est composé de plusieurs services indépendants qui communiquent entre eux via RabbitMQ. Les services incluent la gestion des utilisateurs, des commandes et des menus. Chaque service est développé en utilisant Node.js et Express, et utilise MongoDB pour le stockage des données.

## Technologies utilisées

- **Node.js** : Environnement d'exécution pour JavaScript côté serveur.
- **Express** : Framework web pour Node.js.
- **MongoDB** : Base de données NoSQL pour le stockage des données.
- **RabbitMQ** : Broker de messages pour la communication entre services.
- **Docker** : Conteneurisation des applications pour une gestion simplifiée.
- **Docker Compose** : Outil pour définir et exécuter des applications multi-conteneurs.

## Installation

1. **Cloner le dépôt :**

   ```bash
   git clone https://github.com/groupe-efrei-microservices/restaurant-microservices.git
   cd restaurant-microservices
   ```

2. **Configurer les variables d'environnement (Optionel) :**

   Créez un fichier `.env` dans chaque dossier de service (`utilisateur`, `commande`, `menu`) et définissez les variables nécessaires comme `MONGO_URI`, `RABBITMQ_URL`, et `JWT_SECRET`.

3. **Construire et démarrer les conteneurs Docker :**

   Assurez-vous que Docker et Docker Compose sont installés sur votre machine. Ensuite, exécutez :

   ```bash
   docker-compose up --build
   ```

   Cela construira et démarrera tous les services définis dans le fichier `docker-compose.yml`.

## Utilisation

Une fois les conteneurs démarrés, vous pouvez accéder aux services via les ports définis dans le fichier `docker-compose.yml`. Par exemple, le service utilisateur est accessible sur `http://localhost:3003`.

## Endpoints

### Service Utilisateur

#### 1. Enregistrement d'un utilisateur
**POST** `/api/users/register`

- **Description :** Crée un nouvel utilisateur.
- **Body :**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "address": "123 Main Street",
    "phone": "123456789"
  }
- **Réponses** :
   - 201 Created : Utilisateur créé avec succès.
   - 400 Bad Request : L'utilisateur existe déjà.
   - 500 Internal Server Error : Erreur lors de l'enregistrement.

#### 2. Connexion d'un utilisateur
**POST** `/api/users/login`

- **Description :** Connecte un utilisateur existant et renvoie un token JWT.
- **Body :**
  ```json
  {
     "email": "user@example.com",
     "password": "password123"
   }
- **Réponses** :
   - 201 OK : Connexion réussie avec un token JWT.
   - 400 Bad Request : Identifiants invalides.
   - 500 Internal Server Error : Erreur lors de la connexion.

#### 3. Profil de l'utilisateur connecté
**GET** `/api/users/profile`

- **Description :** Récupère les informations du profil de l'utilisateur connecté.
- **Headers :**
  - Authorization: Bearer <token>
- **Réponses** :
   - 201 OK : Détails de l'utilisateur.
   - 400 Bad Request : Utilisateur non trouvé.
   - 500 Internal Server Error : Erreur lors de la récupération du profil.

#### 4. Récupérer tous les utilisateurs (Admin uniquement)
**GET /api/users/** 
- **Description :** Récupère la liste de tous les utilisateurs
- **Headers :**
  - Authorization: Bearer <token>
- **Réponses** :
   - 201 OK : Liste des utilisateurs (sans les mots de passe).
   - 500 Internal Server Error : Erreur lors de la récupération des utilisateurs.

#### 5. Modifier un utilisateur
**PUT** `/api/users/:id`

- **Description :** Met à jour les informations d'un utilisateur.
- **Headers :**
  - Authorization: Bearer <token>
- **Params :**
  - id: ID de l'utilisateur à modifier.
- **Body :**
  ```json
  {
    "email": "newuser@example.com",
    "address": "1234 Main Street",
    "phone": "023456789"
  }
- **Réponses** :
   - 201 OK : Utilisateur modifié avec succès.
   - 400 Bad Request : Utilisateur non trouvé.
   - 500 Internal Server Error : Erreur lors de la modification.

#### 6. Supprimer un utilisateur
**DELETE** `/api/users/:id`

- **Description :** Supprime un utilisateur.
- **Headers :**
  - Authorization: Bearer <token>
- **Params :**
  - id: ID de l'utilisateur à supprimer.
- **Réponses** :
   - 201 OK : Utilisateur supprimé avec succès.
   - 400 Bad Request : Utilisateur non trouvé.
   - 500 Internal Server Error : Erreur lors de la suppression.

### Service Commande

#### 1. Créer une commande
**POST** `/api/orders`

- **Description :** Crée une nouvelle commande après vérification de la disponibilité des éléments de menu via RabbitMQ.
- **Headers :**
  - Authorization: Bearer <token>
- **Body :**
  ```json
  {
    "customerName": "John Doe",
    "menuId": "64abc123ef56789012345678",
    "quantity": 2
  }
- **Réponses** :
   - 201 Created : Commande créée avec succès.
   - 404 Not Found : Élément de menu introuvable.
   - 400 Bad Request : Élément de menu non disponible.
   - 500 Internal Server Error : Erreur lors de la création de la commande.

#### 2. Récupérer toutes les commandes
**GET** `/api/orders`

- **Description :** Crée une nouvelle commande après vérification de la disponibilité des éléments de menu via RabbitMQ.
- **Headers :**
  - Authorization: Bearer <token>
- **Réponses** :
   - 200 OK : Liste des commandes
   - 500 Internal Server Error : Erreur lors de la récupération des commandes.

#### 3. Mettre à jour une commande
**PUT** `/api/orders/:id`

- **Description :** Met à jour une commande existante.
- **Headers :**
  - Authorization: Bearer <token>
- **Params :**
  - id: ID de l'utilisateur à modifier.
- **Body :**
  ```json
  {
     "status": "confirmed"
   }
- **Réponses** :
   - 200 OK : Commande mise à jour avec succès
   - 404 Not Found : Commande introuvable.
   - 500 Internal Server Error : Erreur lors de la mise à jour.

#### 4. Supprimer une commande
**DELETE** `/api/orders/:id`

- **Description :** Supprime une commande existante.
- **Headers :**
  - Authorization: Bearer <token>
- **Params :**
  - id: ID de la commande à supprimer.
- **Réponses** :
   - 200 OK : Commande supprimée avec succès
   - 404 Not Found : Commande introuvable.
   - 500 Internal Server Error : Erreur lors de la suppression.

### Service Menu

#### 1. Ajouter un menu
**POST** `/api/menus`

- **Description :** Ajoute un nouveau menu au système.
- **Headers :**
  - Authorization: Bearer <token>
- **Body :**
  ```json
  {
    "name": "Pizza Margherita",
    "description": "Classic pizza with tomato sauce, mozzarella, and basil.",
    "price": 12.99,
    "category": "Italian",
    "isAvailable": true //default
  }
- **Réponses** :
   - 201 Created : Menu ajouté avec succès.
   - 500 Internal Server Error : Erreur lors de l'ajout du menu.

#### 2. Récupérer tous les menus
**GET** `/api/menus`

- **Description :** Renvoie la liste de tous les menus disponibles dans le système.
- **Headers :**
  - Authorization: Bearer <token>
- **Réponses** :
   - 200 OK : Liste des menus.
   - 500 Internal Server Error : Erreur lors de la récupération des menus

#### 3. Mettre à jour un menu
**PUT** `/api/menus/:id`

- **Description :** Met à jour un menu existant.
- **Headers :**
  - Authorization: Bearer <token>
- **Params :**
  - id: ID du menu à modifier.
- **Body :**
  ```json
  {
     "price": 14.99,
     "isAvailable": false
   }
- **Réponses** :
   - 200 OK : Menu mis à jour avec succès.
   - 404 Not Found : Menu introuvable.
   - 500 Internal Server Error : Erreur lors de la mise à jour

#### 4. Supprimer un menu
**DELETE** `/api/menus/:id`

- **Description :** Supprime un menu existant et publie un message sur RabbitMQ pour signaler la suppression.
- **Headers :**
  - Authorization: Bearer <token>
- **Params :**
  - id: ID du menu à supprimer.
- **Réponses** :
   - 200 OK : Menu supprimé avec succès
   - 404 Not Found : Menu introuvable.
   - 500 Internal Server Error : Erreur lors de la suppression.
