const ArticleModelBuilder = require('../models/Article');// récupération du modèle article
//const fs = require('fs'); // récupération du package fs de node.js pour nous permettre d'effectuer des opérations sur le systeme de fichiers
const sequelize = require('../database.js'); // récupération de la base de donnée

/* ### LOGIQUE MÉTIER ### */

/*POST */
exports.createArticle = (req, res, next) => {
  //console.log(req.get("sequelize"));
  const Article = ArticleModelBuilder(sequelize);
  //console.log(Article);
  //const articleObject = JSON.parse(req.body.article); // on extrait l'objet JSON de notre req.body.article
  const article = new Article({ // on crée une instance de notre classe Sauce
    idUSERS : req.body.userId,
    title : req.body.title,
    text : req.body.text,
    file : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  article.save()
    .then(() => res.status(201).json({ message: 'Article enregistrée' }))
    .catch(error => res.status(400).json({ error : "erreur createArticle" }));
};
/* exports.createArticle = (req, res, next) => {
  const articleObject = JSON.parse(req.body.article); // on extrait l'objet JSON de notre req.body.article (qui est un objet JS sous forme de chaîne de caractère) en transformant cette chaîne en objet
  delete articleObject._id; // on enlève l'id de articleObject
  const article = new Article({ // on crée une instance de notre classe Sauce
    ...articleObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // le front end ne connaissant pas l'url de l'image (c'est le middleware multer qui le génère), il faut le définir manuellement dans un template littéral : protocol, host du serveur (la racine du serveur ou localhost:3000), répertoire, nom du fichier.
  });
  article.save()
    .then(() => res.status(201).json({ message: 'Article enregistrée' }))
    .catch(error => res.status(400).json({ error }));
}; */


/* POST LIKE */
exports.postLike = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;

  if (like === 0) {
    Article.findOne({ _id: req.params.id }) // on récupère l'article concernée
      .then((sauce) => {
        //console.log(article); // TEST
        if (article.usersLiked.includes(req.body.userId)) { // si cet utilisateur a déjà like l'article
          Article.updateOne(//on modifie cet article
            { _id: req.params.id },
            {
              $pull: { usersLiked: req.body.userId }, // on retire l'userId 
              $inc: { likes: -1 }, // on retire 1 like 
              _id: req.params.id
            }
          )
            .then(() => res.status(200).json({ message: 'Like retiré' }))
            .catch((error) => res.status(400).json({ error }))
        }
        if (article.usersDisliked.includes(req.body.userId)) { // si cet utilisateur a déjà dislike l'article
          Article.updateOne( // on modifie cet article
            { _id: req.params.id },
            {
              $pull: { usersDisliked: req.body.userId }, // on retire  l'userId
              $inc: { dislikes: -1 }, // on retire 1 dislike
              _id: req.params.id
            }
          )
            .then(() => res.status(200).json({ message: 'Dislike retiré' }))
            .catch((error) => res.status(400).json({ error }))
        }
        else {
          () => res.status(200).json({ message: 'Merci de nous donner votre avis' }) 
        }
      }
      )
      .catch((error) => res.status(404).json({ error }))
  };

  if (like === 1) {
    Article.updateOne(//on modifie cet article
      { _id: req.params.id },
      {
        $push: { usersLiked: userId }, // on ajoute l'userId 
        $inc: { likes: 1 }, // on ajoute 1 like 
      }
    )
      .then(() => res.status(200).json({ message: 'Like ajouté' }))
      .catch((error) => res.status(400).json({ error }))
  };

  if (like === -1) {
    Article.updateOne(//on modifie cet article
      { _id: req.params.id },
      {
        $push: { usersDisliked: userId }, // on ajoute l'userId 
        $inc: { dislikes: 1 }, // on ajoute 1 dislike 
      }
    )
      .then(() => res.status(200).json({ message: 'dislike ajouté' }))
      .catch((error) => res.status(400).json({ error }))
  };
};


/* GET */
exports.getAllArticle = (req, res, next) => {
  Article.findAll()// récuparation de la liste complète des articles
    .then(articles => res.status(200).json(articles))
    .catch(error => res.status(400).json({ error }));
};


/* GET ONE SAUCE */
exports.getOneArticle = (req, res, next) => {
  Article.findOne({ _id: req.params.id }) // récupération d'un article unique
    .then(articles => res.status(200).json(articles))
    .catch(error => res.status(400).json({ error }));
};


/* PUT */
exports.modifyArticle = (req, res, next) => {
  const articleObject = req.file ? // on crée l'objet articleObject et on utilise l'opérateur ternaire "? {} : {}" pour savoir si req.file existe (si l'image existe)
    { // si le fichier existe
      ...JSON.parse(req.body.sauce), // on fait comme pour la route POST
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };  // si req.file n'existe pas, on envoi simplement les éléments
  if (req.file) {
    Article.findOne({ _id: req.params.id })
      .then(article => {
        const filename = article.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {// suppression de l'image à remplacer
          Article.updateOne({ _id: req.params.id }, { ...articleObject, _id: req.params.id }) //mise à jour d'une sauce
            .then(() => res.status(200).json({ message: 'Article et image modifié' }))
            .catch(error => res.status(400).json({ error }));
        });
      }).catch(error => res.status(400).json({ error }))
  } else {
    Article.updateOne({ _id: req.params.id }, { ...articleObject, _id: req.params.id }) //mise à jour d'un article
      .then(() => res.status(200).json({ message: 'Article modifié' }))
      .catch(error => res.status(400).json({ error }));
  }
};

/* DELETE */

exports.deleteArticle = (req, res, next) => {
  Article.findOne({ _id: req.params.id }) // on recherche l'objet qui a l'id qui correspond au paramètre de la requête pour avoir l'url de l'image (on aura alors accès au nom du fichier et pourra le supprimer)
    .then(article => { // on veut récupérer le nom du fichier précisément
      const filename = article.imageUrl.split('/images/')[1]; // on récupère l'url de l'image retourné par la base et on la split autour de la chaine de caractère "/images/". On récupère ainsi uniquement le nom du fichier
      fs.unlink(`images/${filename}`, () => { // on appelle la fonction "unlink" de fs qui permet de supprimer le fichier (1er arg : chemin de ce fichier). Le deuxième arg étant un callback qu'on lance une fois le fichier supprimé
        Article.deleteOne({ _id: req.params.id }) // ce callback supprime le thing de la base de donnée
          .then(() => res.status(200).json({ message: 'Article supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

