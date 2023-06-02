// Import des modules nécessaires
const express = require('express');
const mongoose = require('mongoose');

// Création de l'application express
const app = express();

// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://May:MayPassword@maycluster.mezuydd.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware pour parser les requêtes avec du JSON
app.use(express.json());

// Middleware pour servir les fichiers statiques du dossier "public"
app.use(express.static('public'));

//CORS (Cross-Origin Resource Sharing) est un mécanisme de sécurité utilisé par les navigateurs web pour contrôler les requêtes d'un domaine (ou origine) à un autre.
// Middleware pour ajouter les headers CORS aux réponses
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Définition des routes de l'API
const userRoutes = require('../routes/user');
const bookRoutes = require('../routes/book');
const errorHandler = require('../middleware/errorHandler');
app.use('/api/auth', userRoutes);
app.use('/api/books', bookRoutes);
app.use(errorHandler);

// Export de l'application express
module.exports = app;
