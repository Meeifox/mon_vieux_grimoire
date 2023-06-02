const mongoose = require('mongoose');
const Book = require('../../models/book');

/**
 * Récupère tous les livres de la base de données.
 * Utilise la méthode find() de mongoose pour retourner tous les documents de la collection.
 * Renvoie une réponse HTTP 200 avec les données des livres en JSON.
 * Si une erreur se produit, renvoie une réponse HTTP 500 avec un message d'erreur en JSON.
 */
 exports.getAllBooks = async (req, res, next) => {
   try {
   // Récupération de tous les libres de la collection
     const books = await Book.find({});
   // Envoie des données des livres en JSON dans une réponse
     res.status(200).json(books);
   } catch (error) {
   // Envoie une réponse HTTP 500 avec un message d'erreur en JSON si une erreur se produit
     res.status(500).json({
       message: "Une erreur s'est produite lors de la récupération des livres."
     });
   }
 };