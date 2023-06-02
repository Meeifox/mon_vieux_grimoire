const multer = require('multer'); // importation du module multer pour la gestion de fichiers
const fs = require('fs'); // importation du module fs pour la gestion de fichiers

// Configuration du stockage des fichiers téléchargés
const storage = multer.diskStorage({
  destination: (req, file, callback) => { // définition de l'emplacement de destination
    callback(null, 'public/images');
  },
  filename: (req, file, callback) => { // définition du nom de fichier
    const name = file.originalname.split(' ').join('_'); // remplacement des espaces par des tirets bas dans le nom de fichier
    callback(null, name);
  }
});

// Configuration des types de fichiers autorisés pour le téléchargement
const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') { // si le type de fichier est jpeg ou png
    callback(null, true); // accepter le fichier
  } else {
    callback(null, false); // rejeter le fichier
  }
};

// Configuration du middleware Multer avec les options de stockage et de filtrage
const upload = multer({
  storage: storage, // stockage des fichiers
  limits: {
    fileSize: 4 * 1024 * 1024 // limite de taille des fichiers à 4 Mo
  },
  fileFilter: fileFilter // filtrage des types de fichiers autorisés
});

// Middleware pour gérer les fichiers image téléchargés
module.exports = (req, res, next) => {
  fs.chmod('public/images', 0o755, (err) => { // modification des permissions du dossier de destination des images téléchargées pour s'assurer qu'il est accessible en écriture
    if (err) {
      console.log('Erreur lors de la modification des permissions pour le dossier `images`');
    }
  });
  upload.single('image')(req, res, (err) => { // traitement de la requête de téléchargement d'un fichier image
    if (err) {
      console.log('Image supérieure à 4 Mo');
      res.status(400).json({ message: 'L\'image dépasse la taille maximale autorisée (4 Mo).' }); // renvoie une erreur de taille si le fichier est trop volumineux
    } else {
      next(); // continuer l'exécution de la requête si le fichier est accepté
    }
  });
};
