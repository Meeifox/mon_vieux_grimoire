const app = require('./app/app'); // Importer notre application Express
const http = require('http'); // Importer le module HTTP intégré à Node.js

// Fonction pour normaliser le port d'écoute
const normalizePort = val => {
  const port = parseInt(val, 10); // Convertir la valeur en entier décimal

  if (isNaN(port)) { // Si la valeur n'est pas un nombre, la renvoyer
    return val;
  }
  if (port >= 0) { // Si le port est un nombre positif, le renvoyer
    return port;
  }
  return false; // Dans tous les autres cas, renvoyer false
};

const port = normalizePort(process.env.PORT || '4000'); // Obtenir le numéro de port à écouter. S'il est spécifié dans les variables d'environnement, l'utiliser, sinon utiliser le port 4000.

app.set('port', port); // Définir le numéro de port sur l'application Express

// Fonction pour gérer les erreurs de démarrage du serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') { // Si l'erreur ne concerne pas la méthode listen
    throw error;
  }
  const address = server.address(); // Obtenir l'adresse sur laquelle le serveur est en train d'écouter
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port; // Définir le format d'affichage de l'adresse
  switch (error.code) {
    case 'EACCES': // L'utilisateur ne dispose pas des privilèges nécessaires pour écouter sur le port
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE': // Le port est déjà en cours d'utilisation
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app); // Créer un serveur HTTP avec notre application Express

server.on('error', errorHandler); // Gérer les erreurs lors du démarrage du serveur
server.on('listening', () => {
  const address = server.address(); // Obtenir l'adresse sur laquelle le serveur est en train d'écouter
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port; // Définir le format d'affichage de l'adresse
  console.log('Listening on ' + bind); // Afficher un message de confirmation
});

server.listen(port); // Mettre le serveur en écoute sur le port spécifié.
