const express = require('express'); // on récupère express afin de pouvoir créer un routeur
const router = express.Router(); // on crée le routeur
const userCtrl = require('../controllers/user'); // on récupère le controleur pour "user"
const bouncer = require('express-bouncer')(500, 30000, 5); //on récupère express-bouncer (anti attaque par force brut) et on le paramètre pour qu'un utilisateur ne puisse pas saisir plus de 5 mots de passes consécutivement sans devoir attendre entre 0.5s et 30secondes pour retenter de se connecter
bouncer.whitelist.push ("127.0.0.1"); // ajout de localhost sur liste blanche
const auth = require('../middleware/auth');

/* ### ROUTES ### */

router.post('/signup', userCtrl.signup); // inscription
router.post('/signin', bouncer.block, userCtrl.signin); // connexion
router.delete('/deleteUser', auth, userCtrl.deleteUser); // suppression d'un utilisateur en cascade sur toutes les tables associées
// router.get('/getOneUser/:id', auth, userCtrl.getOneUser); // PROJET D'EVOLUTION

/* EXPORT */
module.exports = router;

