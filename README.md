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

- **POST /api/orders/order** : Créer une nouvelle commande.
- **GET /api/orders/order** : Récupérer toutes les commandes.
- **PATCH /api/orders/order/:id** : Mettre à jour une commande.
- **DELETE /api/orders/order/:id** : Supprimer une commande.

### Service Menu

- **POST /api/menus/menu** : Ajouter un nouvel élément de menu.
- **GET /api/menus/menu** : Récupérer tous les éléments de menu.
- **PUT /api/menus/menu/:id** : Mettre à jour un élément de menu.
- **DELETE /api/menus/menu/:id** : Supprimer un élément de menu.
