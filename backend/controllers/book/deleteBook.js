const mongoose = require('mongoose');
const Book = require('../../models/book');
const fs = require('fs');
/**
* Recherche un livre dans la base de données à partir de son ID.
* Si l'utilisateur authentifié n'est pas autorisé à supprimer le livre, une réponse HTTP 401 est renvoyée.
* Sinon, l'image associée au livre est supprimée du serveur et le livre est supprimé de la base de données.
* Si l'opération réussit, une réponse HTTP 200 est renvoyée avec un message de succès en JSON.
* Si une erreur se produit, renvoie une réponse HTTP 500 avec un message d'erreur en JSON.
*/
exports.deleteBook = (req, res, next) => {
   Book.findOne({ _id: req.params.id}) // Chercher le livre par son ID
       .then(book => {
           if (book.userId != req.auth.userId) { // Verifier que le livre correspond
               res.status(401).json({message: 'Not authorized'});
           } else {
               const filename = book.imageUrl.split('public/images/')[1];
               fs.unlink(`images/${filename}`, () => {
                   Book.deleteOne({_id: req.params.id})
                       .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                       .catch(error => res.status(401).json({ error }));
               });
           }
       })
       .catch( error => {
           res.status(500).json({ error });
       });
};
