const mongoose = require('mongoose');
const Book = require('../../models/book');

/**
* Récupère un livre dans la base de données en utilisant son identifiant unique (ID).
* Utilise la méthode findById() de mongoose pour rechercher le livre avec l'ID spécifié.
* Si le livre est trouvé, renvoie une réponse HTTP 200 avec les données du livre en JSON.
* Si le livre n'est pas trouvé, renvoie une réponse HTTP 404 avec un message d'erreur en JSON.
* Note : "try"  permet d'encadrer un bloc de code qui peut potentiellement générer une exception (ou une erreur) pendant son exécution.
*/
exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id; // Récupérer l'ID du livre depuis les paramètres de requête
    const book = await Book.findById(bookId); // Chercher le livre correspondant dans la base de données
    if (!book) { // Si le livre n'est pas trouvé, renvoyer une réponse avec un code d'état 404 et un message d'erreur
      return res.status(404).json({ message: "Aucun livre n'a été trouvé avec cet ID." });
    }
    return res.status(200).json(book); // Si le livre est trouvé, renvoyer une réponse avec un code d'état 200 et les données du livre
  } catch (err) { // Si une erreur se produit, renvoyer une réponse avec un code d'état 500 et un message d'erreur
    console.error(err);
    return res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du livre.' });
  }
};
