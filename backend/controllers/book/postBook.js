const mongoose = require('mongoose');
const Book = require('../../models/book');

/**
* Cette fonction a pour objectif de sauvegarder un livre dans la base de données. Elle prend en entrée une requête (req), une réponse (res) et une fonction de rappel (next).
* Les étapes de la fonction sont les suivantes :
* * Parser l'objet JSON de la requête et stocker-le dans la variable bookObject.
* * Créer une nouvelle instance de Book à partir de bookObject, l'ID de l'utilisateur connecté et l'URL de l'image du livre. Stocker-la dans la variable book.
* * Sauvegarder l'objet book dans la base de données en appelant la méthode save() de Mongoose.
* Si la sauvegarde réussit, envoyer une réponse JSON avec un message de succès et un code de statut HTTP 201.
* Si la sauvegarde échoue, envoyer une réponse JSON avec une erreur et un code de statut HTTP 400.
*/

// Permet d'expporter postBook
exports.postBook = (req, res, next) => {

    // Analyse les données du livres à partir des donées JSON
    const bookObject = JSON.parse(req.body.book);

    // Créer un nouveu libre (Book) en utilisant les données du livre analysées, l'ID utilisateur et l'URL de l'image
    const book = new Book({
        ...bookObject, // Utiliser l'opérateur de propagation pour ajouter toutes les propriétés de `bookObject`
        userId: req.auth.userId, // Ajout l'id de l'utilisateur authentifié
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // Construit URL de l'image
    });

    // Save book dans le database
    book.save().then(
        () => {
            // Si réussi, envoyer une réponse avec un code d'état 201 et un message de succès
            res.status(201).json(
            { message: 'Livre enregistré avec succès !'});
        }
    ).catch(
        (error) => {
            // Si une erreur se produit, envoyer une réponse avec un code d'état 400 et le message d'erreur
            res.status(400).json(
            { error: error }
            );
        }
    );
};
