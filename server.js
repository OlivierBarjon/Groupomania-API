const http = require('http'); // récupération du package http de node.js
const app = require('./app'); // récupération de l'application express
require('dotenv').config() // On récupère les variables d'environnement

/* NORMALIZE PORT */
// la fonction normalizePort renvoie un port valide
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};


const port = normalizePort(process.env.PORT || '3000'); // port 3000 ou port défini par l'environnement
app.set('port', port); // assignation du port à l'application express


/* ERRORHANDLER */
// la fonction errorHandler recherche les différentes erreurs et les gère
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app); // création du serveur (on passe l'appli express à notre serveur)

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port); // configuration du serveur sur le port (3000)
