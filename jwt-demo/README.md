# 🎓 JWT Demo - Vue.js + Express + MongoDB

**Démonstration pratique d'authentification JWT entre un frontend Vue.js et un backend Express/MongoDB**

BUT Informatique S4 - Module R401

---

## 📋 Description

Cette démo illustre une **authentification JWT stateless** complète :
- ✅ **Pas de sessions serveur** (stateless)
- ✅ **Pas de stockage JWT en base** (seul le user est stocké)
- ✅ **Access Token** stocké dans `localStorage` côté client
- ✅ **Header Authorization Bearer** pour les requêtes protégées
- ✅ **MongoDB** pour stocker uniquement les utilisateurs
- ✅ **CORS** configuré pour communication Vue.js ↔ Express

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (Vue.js)                       │
│  ┌────────────┐  ┌─────────────┐  ┌────────────────────┐  │
│  │  Register  │  │    Login    │  │  Home (Protected)  │  │
│  └────────────┘  └─────────────┘  └────────────────────┘  │
│         │               │                    │              │
│         └───────────────┴────────────────────┘              │
│                         │                                   │
│              ┌──────────▼──────────┐                        │
│              │  localStorage       │                        │
│              │  - accessToken      │                        │
│              │  - user (JSON)      │                        │
│              └─────────────────────┘                        │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP + CORS
                       │ Authorization: Bearer TOKEN
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Express)                        │
│  ┌──────────────┐  ┌────────────────┐  ┌────────────────┐ │
│  │ POST /register│  │ POST /login    │  │ GET /profile  │ │
│  │              │  │                │  │ (Protected)   │ │
│  └──────────────┘  └────────────────┘  └────────────────┘ │
│         │                  │                    │           │
│         └──────────────────┴────────────────────┘           │
│                            │                                │
│                 ┌──────────▼───────────┐                    │
│                 │  JWT Middleware      │                    │
│                 │  jwt.verify(token)   │                    │
│                 └──────────────────────┘                    │
│                            │                                │
│                 ┌──────────▼───────────┐                    │
│                 │     MongoDB          │                    │
│                 │  - users collection  │                    │
│                 │  - NO tokens stored  │                    │
│                 └──────────────────────┘                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Installation et Démarrage

### Prérequis

- **Node.js** v18+ ([https://nodejs.org](https://nodejs.org))
- **MongoDB** installé et démarré sur `localhost:27017`

#### Démarrer MongoDB (si pas déjà fait)

```bash
# macOS (avec Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Lancer MongoDB via le service ou :
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"
```

Vérifier que MongoDB fonctionne :
```bash
mongosh --eval "db.version()"
```

---

### 1. Installation Backend

```bash
cd jwt-demo/backend
npm install
```

**Démarrer le serveur backend :**
```bash
npm start
# ou avec nodemon pour le dev
npm run dev
```

✅ Le serveur démarre sur **http://localhost:3000**

**Test rapide :**
```bash
curl http://localhost:3000
```

Vous devriez voir les endpoints disponibles.

---

### 2. Installation Frontend

**Dans un nouveau terminal :**

```bash
cd jwt-demo/frontend
npm install
```

**Démarrer le serveur de développement Vue.js :**
```bash
npm run dev
```

✅ L'application démarre sur **http://localhost:5173**

Ouvrez votre navigateur sur cette URL.

---

## 🎯 Utilisation

### Scénario complet

1. **Inscription** (`/register`)
   - Créer un compte avec nom, email, password
   - → Backend hache le password avec bcrypt
   - → Backend génère un JWT
   - → Frontend stocke le token dans `localStorage`
   - → Redirection automatique vers `/home`

2. **Page Home** (`/home` - protégée)
   - Affiche les infos du profil
   - Charge les données depuis `/api/auth/profile`
   - → Frontend envoie le token dans `Authorization: Bearer TOKEN`
   - → Backend vérifie le JWT et retourne les données

3. **Déconnexion**
   - Supprime le token de `localStorage`
   - → Redirection vers `/login`

4. **Connexion** (`/login`)
   - Se connecter avec email + password existant
   - → Backend vérifie le password avec bcrypt
   - → Backend génère un nouveau JWT
   - → Frontend stocke le token
   - → Redirection vers `/home`

---

## 🧪 Tests avec curl

### Inscription
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jean Dupont",
    "email": "jean.dupont@example.com",
    "password": "password123"
  }'
```

**Réponse attendue :**
```json
{
  "message": "Compte créé avec succès",
  "user": { "_id": "...", "email": "jean.dupont@example.com", "name": "Jean Dupont" },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "1h"
}
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jean.dupont@example.com",
    "password": "password123"
  }'
```

### Accéder au profil (avec token)
```bash
# Remplacez YOUR_TOKEN par le token reçu lors du login
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer $TOKEN"
```

**Réponse attendue :**
```json
{
  "message": "Profil utilisateur",
  "user": {
    "_id": "...",
    "email": "jean.dupont@example.com",
    "name": "Jean Dupont",
    "createdAt": "2025-01-14T..."
  }
}
```

### Lister tous les utilisateurs (debug)
```bash
curl http://localhost:3000/api/auth/users
```

---

## 📂 Structure du Projet

```
jwt-demo/
├── backend/                    # Serveur Express + MongoDB
│   ├── server.js               # Point d'entrée
│   ├── .env                    # Configuration (MongoDB, JWT secret)
│   ├── models/
│   │   └── User.js             # Modèle Mongoose (avec bcrypt)
│   ├── middleware/
│   │   └── auth.js             # Middleware JWT (authenticateToken)
│   ├── routes/
│   │   └── auth.js             # Routes /register, /login, /profile
│   └── package.json
│
└── frontend/                   # Application Vue.js (Vite)
    ├── index.html
    ├── src/
    │   ├── main.js             # Point d'entrée
    │   ├── App.vue             # Composant racine
    │   ├── style.css           # Styles globaux
    │   ├── router/
    │   │   └── index.js        # Vue Router (navigation guards)
    │   ├── services/
    │   │   └── api.js          # Service Axios (intercepteurs JWT)
    │   └── views/
    │       ├── Register.vue    # Page inscription
    │       ├── Login.vue       # Page connexion
    │       └── Home.vue        # Page d'accueil (protégée)
    ├── vite.config.js
    └── package.json
```

---

## 🔑 Points Clés de la Démo

### 1. Pas de Session Serveur (Stateless)

**Backend :**
- ✅ Pas de `express-session`
- ✅ Pas de store Redis/Memcached
- ✅ Le serveur ne garde aucune trace de connexion

**Comment ça marche ?**
- Le JWT contient toutes les infos nécessaires (`userId`)
- Le serveur **vérifie la signature** du JWT à chaque requête
- Si signature valide → utilisateur authentifié

### 2. Stockage du Token côté Client

**Dans `localStorage` :**
```javascript
// Après login réussi
localStorage.setItem('accessToken', response.data.token)
localStorage.setItem('user', JSON.stringify(response.data.user))

// Pour récupérer
const token = localStorage.getItem('accessToken')
```

**Avantages :**
- Simple à implémenter
- Persiste après fermeture du navigateur

**⚠️ Sécurité :**
- Vulnérable aux attaques XSS
- **Alternative** : HttpOnly cookies (voir TPs pour implémentation)

### 3. Intercepteur Axios

**Fichier : `frontend/src/services/api.js`**

```javascript
// Ajoute automatiquement le token à chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

**Résultat :**
- Toutes les requêtes incluent : `Authorization: Bearer eyJhbGc...`
- Plus besoin de l'ajouter manuellement à chaque appel

### 4. Middleware Backend

**Fichier : `backend/middleware/auth.js`**

```javascript
const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) return res.status(401).json({ error: 'Token requis' })

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const user = await User.findById(decoded.userId).select('-password')

  req.user = user
  next()
}
```

**Utilisation :**
```javascript
// Route protégée
router.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user })  // req.user est disponible !
})
```

### 5. Navigation Guards (Vue Router)

**Fichier : `frontend/src/router/index.js`**

```javascript
router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated()

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')  // Rediriger vers login si non connecté
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next('/home')   // Rediriger vers home si déjà connecté
  } else {
    next()
  }
})
```

---

## 🔒 Sécurité

### ⚠️ Cette démo est éducative

**Points à améliorer pour la production :**

1. **HTTPS obligatoire** en production
2. **Refresh Token** pour renouveler l'Access Token
3. **HttpOnly cookies** au lieu de localStorage (protège contre XSS)
4. **Validation robuste** des entrées (email, password strength)
5. **Rate limiting** pour éviter le brute force
6. **CSRF protection** si utilisation de cookies
7. **Secret JWT plus fort** (minimum 256 bits aléatoires)
8. **Expiration courte** du token (15 min au lieu de 1h)

---

## 🐛 Dépannage

### MongoDB ne démarre pas

```bash
# Vérifier si MongoDB est installé
mongosh --version

# Vérifier le statut
brew services list | grep mongodb  # macOS
sudo systemctl status mongod       # Linux
```

### Erreur CORS

**Symptôme :** `Access to fetch has been blocked by CORS policy`

**Solution :**
- Vérifier que le backend tourne sur `localhost:3000`
- Vérifier que le frontend tourne sur `localhost:5173`
- Vérifier `FRONTEND_URL` dans `.env` du backend

### Token expiré

**Symptôme :** Redirection automatique vers `/login`

**Explication :** Le token expire après 1h (`JWT_EXPIRES_IN=1h`)

**Solution :**
- Se reconnecter pour obtenir un nouveau token
- Ou implémenter un Refresh Token (voir TPs)

### Port déjà utilisé

```bash
# Backend (port 3000)
lsof -ti:3000 | xargs kill -9

# Frontend (port 5173)
lsof -ti:5173 | xargs kill -9
```

---

## 📚 Ressources Complémentaires

- **TPs complets** : Voir `../tp-labs/` pour approfondir
- **Exemples** : Voir `../exemples-presentation/` pour du code de référence
- **Slides** : Consulter les slides du cours R401

---

## 🎓 Concepts Couverts

✅ **JWT (JSON Web Token)** : Génération, signature, vérification
✅ **Stateless Authentication** : Pas de session serveur
✅ **CORS** : Communication frontend/backend cross-origin
✅ **Bcrypt** : Hachage sécurisé des mots de passe
✅ **MongoDB + Mongoose** : Base de données NoSQL
✅ **Vue.js 3 + Composition API** : Framework frontend
✅ **Axios Interceptors** : Gestion automatique du token
✅ **Vue Router Guards** : Protection des routes

---

## 👨‍🏫 Auteur

**BUT Informatique - Semestre 4 - R401**
Université de Franche-Comté
Année Universitaire 2025-2026

---

**Bon courage pour vos apprentissages ! 🚀**
