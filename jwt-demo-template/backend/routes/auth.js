const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Fonction pour générer un JWT (FOURNIE)
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
};

// ============================================
// TODO 6: Route POST /register - Inscription
// ============================================
// Créer une route pour inscrire un nouvel utilisateur
//
// Étapes:
// 1. Extraire email, password, name du req.body
// 2. Valider que tous les champs sont présents
// 3. Vérifier si l'email existe déjà (User.findOne)
// 4. Créer et sauvegarder l'utilisateur (new User + save)
// 5. Générer un token JWT avec generateToken()
// 6. Retourner le token et l'utilisateur (sans password)
//
router.post('/register', async (req, res) => {
  try {
    // TODO: Implémenter la logique d'inscription
    // const { email, password, name } = req.body;

    // TODO: Validation
    // if (!email || !password || !name) { ... }

    // TODO: Vérifier email existant
    // const existingUser = await User.findOne({ email });
    // if (existingUser) { ... }

    // TODO: Créer utilisateur
    // const user = new User({ email, password, name });
    // await user.save();

    // TODO: Générer token
    // const token = generateToken(user._id);

    // TODO: Retourner réponse
    // res.status(201).json({ ... });

    res.status(500).json({ error: 'Route non implémentée' });
  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({
      error: 'Erreur serveur',
      message: error.message
    });
  }
});

// ============================================
// TODO 7: Route POST /login - Connexion
// ============================================
// Créer une route pour connecter un utilisateur existant
//
// Étapes:
// 1. Extraire email et password du req.body
// 2. Valider que les champs sont présents
// 3. Trouver l'utilisateur par email (User.findOne)
// 4. Vérifier que l'utilisateur existe
// 5. Comparer le password avec user.comparePassword()
// 6. Générer un token JWT avec generateToken()
// 7. Retourner le token et l'utilisateur
//
router.post('/login', async (req, res) => {
  try {
    // TODO: Implémenter la logique de connexion
    // const { email, password } = req.body;

    // TODO: Validation
    // if (!email || !password) { ... }

    // TODO: Trouver utilisateur
    // const user = await User.findOne({ email });
    // if (!user) { ... }

    // TODO: Vérifier password
    // const isPasswordValid = await user.comparePassword(password);
    // if (!isPasswordValid) { ... }

    // TODO: Générer token
    // const token = generateToken(user._id);

    // TODO: Retourner réponse
    // res.json({ ... });

    res.status(500).json({ error: 'Route non implémentée' });
  } catch (error) {
    console.error('Erreur login:', error);
    res.status(500).json({
      error: 'Erreur serveur',
      message: error.message
    });
  }
});

// ============================================
// TODO 8: Route GET /profile - Profil protégé
// ============================================
// Créer une route protégée qui retourne le profil de l'utilisateur connecté
//
// Indications:
// - Utiliser le middleware authenticateToken
// - L'utilisateur est disponible dans req.user (ajouté par le middleware)
// - Retourner simplement req.user
//
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // TODO: Retourner le profil utilisateur
    // L'utilisateur est dans req.user (ajouté par authenticateToken)
    // res.json({ message: 'Profil utilisateur', user: req.user });

    res.status(500).json({ error: 'Route non implémentée' });
  } catch (error) {
    res.status(500).json({
      error: 'Erreur serveur',
      message: error.message
    });
  }
});

// GET /users - Liste des utilisateurs (debug) - FOURNIE
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      message: 'Liste des utilisateurs',
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erreur serveur',
      message: error.message
    });
  }
});

module.exports = router;
