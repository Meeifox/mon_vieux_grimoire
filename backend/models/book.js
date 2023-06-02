const mongoose = require('mongoose');

/**
* Crée un nouveau schéma pour la notation des livres en utilisant le module mongoose
*/
const ratingSchema = new mongoose.Schema({
 // Définit la propriété userId qui représente l'ID de l'utilisateur
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Définit le type de la propriété comme ObjectId, qui correspond à l'ID unique généré par MongoDB
    ref: 'User' // Définit une référence vers le modèle User pour indiquer que cette propriété fait référence à un document de ce modèle
  },
 // Définit la propriété grade qui représente la note attribuée par l'utilisateur
  grade: {
    type: Number, // Définit le type de la propriété comme un nombre
    required: true // Indique que cette propriété est requise 
  }
});


/**
* Crée un nouveau schéma pour les livres en utilisant le module mongoose
*/
const bookSchema = new mongoose.Schema({
  // Définit la propriété userId qui représente l'ID de l'utilisateur qui a créé le livre
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Définit le type de la propriété comme ObjectId
    ref: 'User', // Définit une référence vers le modèle User pour indiquer que cette propriété fait référence à un document de ce modèle
    required: true // Indique que cette propriété est requise 
  },
  // Définit la propriété title qui représente le titre du livre
  title: {
    type: String, // Définit le type de la propriété comme chaie de caractères
    required: true // Indique que cette propriété est requise 
  },
  // Définit la propriété author qui représente l'auteur du livre
  author: {
    type: String, // Définit le type de la propriété comme chaie de caractères
    required: true // Indique que cette propriété est requise 
  },
  // Définit la propriété imageUrl qui représente l'URL de l'image du livre
  imageUrl: {
    type: String, // Définit le type de la propriété comme chaie de caractères
    required: true // Indique que cette propriété est requise 
  },
  // Définit la propriété year qui représente l'année de publication du livre
  year: {
    type: Number, // Définit le type de la propriété comme nombre
    required: true // Indique que cette propriété est requise 
  },
  // Définit la propriété genre qui représente le genre du livre
  genre: {
    type: String, // Définit le type de la propriété comme chaie de caractères
    required: true // Indique que cette propriété est requise 
  },
  // Définit la propriété ratings qui est un tableau de notations associées à chaque livre
  ratings: [ratingSchema], // Utilise le schéma ratingSchema pour définir la structure des notations
  // Définit la propriété averageRating qui représente la note moyenne attribuée au livre
  averageRating: {
    type: Number, // Définit le type de la propriété comme nombre
    default: 0 // Définit la valeur des étoiles (notes) par défaut comme 0
  }
});

// Exporte le modèle Book créé à partir du schéma bookSchema
module.exports = mongoose.model('Book', bookSchema);
