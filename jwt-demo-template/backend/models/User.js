const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email requis'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Email invalide']
  },
  password: {
    type: String,
    required: [true, 'Mot de passe requis'],
    minlength: [6, 'Mot de passe trop court (min 6 caractères)']
  },
  name: {
    type: String,
    required: [true, 'Nom requis'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ============================================
// TODO 3: Hook pre-save pour hacher le password
// ============================================
// Implémenter le hook Mongoose pre('save') pour hacher automatiquement
// le mot de passe avant de sauvegarder en base
//
// Indications:
// - Utiliser this.isModified('password') pour vérifier si le password a changé
// - Utiliser bcrypt.genSalt(10) pour générer un salt
// - Utiliser bcrypt.hash(password, salt) pour hacher
// - Assigner le hash à this.password
//
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   try {
//     // ... votre code ici
//   } catch (error) {
//     next(error);
//   }
// });

// ============================================
// TODO 4: Méthode comparePassword
// ============================================
// Créer une méthode d'instance pour comparer un mot de passe en clair
// avec le hash stocké en base
//
// Indice: utiliser bcrypt.compare(candidatePassword, this.password)
//
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   // ... votre code ici
// };

// Méthode pour retourner l'objet sans le password (FOURNIE)
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
