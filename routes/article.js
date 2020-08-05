const express = require('express'); // on récupère express
const router = express.Router(); // on crée un router avec la méthode d'express
const articleCtrl = require('../controllers/article'); // on récupère le controleur pour sauce
const auth = require('../middleware/auth');// on récupère le middleware d'authentification
const multer = require('../middleware/multer-config'); // on récupère le middleware de gestion des fichiers


/* ### ROUTES ### */

/* POST */
router.post ('/', auth, multer, articleCtrl.createArticle); // on applique la logique métier createArticle du controleur à la route POST

/* GET */
router.get('/', auth, articleCtrl.getAllArticle); // on applique la logique métier getAllArticle du controleur à la route GET

/* GET 3 (HOME PAGE) */
router.get('/home', auth, articleCtrl.get3Articles); // on applique la logique métier get3Articles du controleur à la route GET

/* GET SELECTION */
router.get('/selection', auth, articleCtrl.getSelection); // on applique la logique métier getSelection du controleur à la route GET

/* GET ONE */
router.get('/:id', auth,  articleCtrl.getOneArticle); // on applique la logique métier getOneArticle du controleur à la route GET (ID)

/* PUT MODERATEUR */
router.put('/select/:id', auth, articleCtrl.selectArticle); // on applique la logique métier selectArticle du controleur à la route PUT

/* PUT ## PROJET D'EVOLUTION DU PROJET ### */
//router.put('/:id', auth, multer, articleCtrl.modifyArticle); // on applique la logique métier modifyArticle du controleur à la route PUT

/* DELETE ## PROJET D'EVOLUTION DU PROJET ### */
//router.delete('/:id', auth,  articleCtrl.deleteArticle); // on applique la logique métier deleteArticle du controleur à la route DELETE

/* POST LIKE ## PROJET D'EVOLUTION DU PROJET ### */
//router.post('/:id/like', /* auth, */ articleCtrl.postLike); // on applique la logique métier postLike du controleur à la route POST LIKE


/* EXPORT */

module.exports = router;