const User = require('../models/User'); // importation du modèle User
const jwt = require('jsonwebtoken'); // importation du module jsonwebtoken pour la gestion des tokens d'authentification
const bcrypt = require('bcrypt'); // importation du module bcrypt pour le hashage des mots de passe

exports.login = (req, res, next) => {
  console.log("debut controller auth");
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        console.log("Utilisateur ou Mot de passe incorrect.");
        const error = new Error('Utilisateur ou Mot de passe incorrect.');
        error.statusCode = 401;
        throw error; // Passe l'erreur à la prochaine fonction middleware
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            console.log("Utilisateur ou Mot de passe incorrect.");
            const error = new Error('Utilisateur ou Mot de passe incorrect.');
            error.statusCode = 401;
            throw error;
          }

          res.setHeader('Content-Type', 'application/json'); // Définit le type de contenu de la réponse à JSON
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '1h' })
          });
        })
        .catch(error => {
          next(error); // Passe l'erreur à la prochaine fonction middleware
        });
    })
    .catch(error => {
      console.log("erreur global controller");
      console.log(error);
      next(error); // Passe l'erreur à la prochaine fonction middleware
    });
};

exports.createUser =(req, res, next) => {
    bcrypt.hash(req.body.password, 10) // hachage du mot de passe fourni par l'utilisateur à l'aide de la fonction de hachage bcrypt
    .then(hash => { // si le hachage réussit, crée un nouvel utilisateur avec l'adresse email et le mot de passe haché
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save() // sauvegarde le nouvel utilisateur dans la base de données
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => {
          error.message = "Erreur, cet email existe déjà";
          next(error);
        });
    })
    .catch(error => {
      error.statusCode = 500;
      error.message = "Erreur, cet email existe déjà";
      next(error);
    });
};
