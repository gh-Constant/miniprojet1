require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration CORS pour Vue.js
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error('❌ Erreur MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({
    message: '🎓 JWT Demo - Backend Express + MongoDB',
    endpoints: {
      'POST /api/auth/register': 'Créer un compte',
      'POST /api/auth/login': 'Se connecter',
      'GET /api/auth/profile': 'Profil (protégé par JWT)',
      'GET /api/auth/users': 'Liste utilisateurs (debug)'
    },
    database: 'MongoDB localhost:27017',
    jwt: 'Access Token uniquement (pas de session)',
    cors: 'Configuré pour Vue.js'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📊 Base de données: ${process.env.MONGODB_URI}`);
  console.log(`🌐 Frontend autorisé: ${process.env.FRONTEND_URL}`);
});
