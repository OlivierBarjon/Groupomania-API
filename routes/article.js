const express = require('express'); // on récupère express
const router = express.Router(); // on crée un router avec la méthode d'express
const sauceCtrl = require('../controllers/article'); // on récupère le controleur pour sauce
const auth = require('../middleware/auth');// on récupère le middleware d'authentification
const multer = require('../middleware/multer-config'); // on récupère le middleware de gestion des fichiers


/* ### ROUTES ### */

/* POST */
router.post ('/',auth, multer, sauceCtrl.createArticle); // on applique la logique métier createArticle du controleur à la route POST

/* POST LIKE */
router.post('/:id/like', auth, sauceCtrl.postLike); // on applique la logique métier postLike du controleur à la route POST LIKE

/* GET */
router.get('/',auth, sauceCtrl.getAllArticle); // on applique la logique métier getAllArticle du controleur à la route GET

/* GET ONE */
router.get('/:id',auth, sauceCtrl.getOneArticle); // on applique la logique métier getOneArticle du controleur à la route GET (ID)

/* PUT */
router.put('/:id',auth, multer, sauceCtrl.modifyArticle); // on applique la logique métier modifyArticle du controleur à la route PUT

/* DELETE */
router.delete('/:id',auth, sauceCtrl.deleteArticle); // on applique la logique métier deleteArticle du controleur à la route DELETE



/* EXPORT */

module.exports = router;