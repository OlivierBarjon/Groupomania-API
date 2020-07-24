/* ### JWT - Authentification ### */

const jwt = require('jsonwebtoken'); // récupération de jwt pour vérifier les tokens

module.exports = (req, res, next) => {
  try { // pour gérer les problèmes, on utilise un bloc try…catch
    const token = req.headers.authorization.split(' ')[1]; // on récupère le token dans le header authorization (qui se trouve après "bearer_")
    console.log(token); //TEST
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);// on décode le token avec la fonction "verify" de jwt (on vérifie le token par rapport à notre clé secrète)
    const userId = decodedToken.userId; // on récupère le userId qui est dans l'objet decodedToken crée à la ligne du dessus
    console.log(userId);//TEST
    if (req.body.userId && req.body.userId !== userId) { // si on a un userId dans le body ET si il est différent de celui du token, on retourne une erreur 
      throw 'Invalid user ID'; // dans ce cas d'erreur, on renvoi au catch() avec un autre message
    } else {
      next(); // si tout va bien, on appelle next() (car pour toutes les routes protégées, on passera par ce middleware en premier !)
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};