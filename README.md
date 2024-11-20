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

2. **Configurer les variables d'environnement :**

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

- **POST /api/users/register** : Inscription d'un nouvel utilisateur.
- **POST /api/users/login** : Connexion d'un utilisateur.
- **GET /api/users/profile** : Récupérer le profil de l'utilisateur connecté.
- **GET /api/users/** : Récupérer tous les utilisateurs.
- **PUT /api/users/:id** : Modifier un utilisateur.
- **DELETE /api/users/:id** : Supprimer un utilisateur.

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
