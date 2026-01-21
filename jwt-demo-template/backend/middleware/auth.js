const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ============================================
// TODO 5: Middleware authenticateToken
// ============================================
// Créer un middleware pour vérifier le JWT dans le header Authorization
//
// Étapes:
// 1. Extraire le token du header Authorization (format: "Bearer TOKEN")
// 2. Vérifier si le token existe, sinon retourner 401
// 3. Vérifier et décoder le token avec jwt.verify()
// 4. Récupérer l'utilisateur depuis MongoDB avec User.findById()
// 5. Ajouter l'utilisateur à req.user
// 6. Gérer les erreurs (TokenExpiredError, JsonWebTokenError)
//
// Structure:
const authenticateToken = async (req, res, next) => {
  try {
    // TODO: Extraire le token du header
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];

    // TODO: Vérifier si le token existe
    // if (!token) {
    //   return res.status(401).json({ ... });
    // }

    // TODO: Vérifier et décoder le token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // TODO: Récupérer l'utilisateur
    // const user = await User.findById(decoded.userId).select('-password');

    // TODO: Vérifier si l'utilisateur existe
    // if (!user) {
    //   return res.status(404).json({ ... });
    // }

    // TODO: Ajouter l'utilisateur à la requête
    // req.user = user;
    // next();

    res.status(500).json({ error: 'Middleware non implémenté' });
  } catch (error) {
    // TODO: Gérer TokenExpiredError
    // if (error.name === 'TokenExpiredError') {
    //   return res.status(401).json({ ... });
    // }

    // TODO: Gérer JsonWebTokenError
    // if (error.name === 'JsonWebTokenError') {
    //   return res.status(403).json({ ... });
    // }

    res.status(500).json({
      error: 'Erreur serveur',
      message: error.message
    });
  }
};

module.exports = { authenticateToken };
