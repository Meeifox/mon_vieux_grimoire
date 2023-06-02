const mongoose = require('mongoose');
const Book = require('../../models/book');

/**
* Cette fonction a pour objectif de modifier les informations d'un livre dans la base de données. Elle prend en entrée une requête (req), une réponse (res) et un prochain middleware (next).
* Les étapes de la fonction sont les suivantes :
* * Récupérer le livre à modifier en utilisant la méthode findById() de Mongoose avec l'ID du livre passé en paramètre (req.params.id). Stocker le résultat dans la variable book.
* * Si le livre n'existe pas, envoyer une réponse JSON avec un message d'erreur et un code de statut HTTP 404.
* * Vérifier que l'utilisateur est autorisé à modifier ce livre en comparant l'ID de l'utilisateur stocké dans la propriété userId du livre (book.userId) avec l'ID de l'utilisateur stocké dans le jeton d'authentification (req.auth.userId). Si les deux ID ne correspondent pas, envoyer une réponse JSON avec un message d'erreur et un code de statut HTTP 401.
* * Si une nouvelle image est fournie dans la requête (req.file), construire l'URL de l'image en utilisant le protocole, le nom d'hôte et le nom de fichier fournis. Stocker l'URL dans la variable imageUrl. Sinon, utiliser l'URL actuelle du livre (book.imageUrl).
* * Mettre à jour les informations du livre en utilisant la méthode findByIdAndUpdate() de Mongoose. Passer en paramètre l'ID du livre à modifier, un objet contenant les nouvelles informations (req.body) et l'URL de l'image (imageUrl), et l'option { new: true } pour retourner le livre mis à jour. Stocker le résultat dans la variable updatedBook.
* * Envoyer une réponse JSON avec le livre mis à jour (updatedBook) et un code de statut HTTP 200.
En cas d'erreur, appeler le prochain middleware avec l'erreur en paramètre (next(error)).
*/

// Exporter la fonction modifyBook pour gérer les requêtes PUT afin de modifier un livre existant
exports.modifyBook = async (req, res, next) => {
  try {
  // Chercher le livre à modifier en utilisant son ID
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Vérifier que l'utilisateur est autorisé à modifier ce livre
    if (book.userId.toString() !== req.auth.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // Mettre à jour le livre dans la base de données en utilisant son ID, les nouvelles données et l'URL de l'image mise à jour
    let imageUrl = book.imageUrl;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body, // Utiliser l'opérateur de décomposition pour ajouter toutes les propriétés de `req.body`
        imageUrl: imageUrl, // Utiliser l'URL de l'image mise à jour
      },
      { new: true } // Renvoyer le livre mis à jour après la modification
    );
    res.status(200).json({ book: updatedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};