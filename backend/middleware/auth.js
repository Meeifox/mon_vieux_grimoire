const jwt = require('jsonwebtoken'); // importation du module jsonwebtoken pour la gestion des tokens d'authentification

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // récupération du token d'authentification à partir de l'en-tête Authorization de la requête
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // vérification de la validité du token à l'aide de la clé secrète prédéfinie
        const userId = decodedToken.userId; // récupération de l'identifiant utilisateur à partir du token décodé
        req.auth = {
            userId: userId
        };
        next(); // continuer l'exécution de la requête si l'utilisateur est authentifié
    } catch(err) {
        res.status(401).json({ message: err }); // renvoie une erreur d'authentification si le token est invalide ou manquant
    }
 };