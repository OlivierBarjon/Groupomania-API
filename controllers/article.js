const Sauce = require('../models/ArticleOLD'); // récupération du modèle
const fs = require('fs'); // récupération du package fs de node.js pour nous permettre d'effectuer des opérations sur le systeme de fichiers


/* ### LOGIQUE MÉTIER ### */

/*POST */
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce); // on extrait l'objet JSON de notre req.body.sauce (qui est un objet JS sous forme de chaîne de caractère) en transformant cette chaîne en objet
  delete sauceObject._id; // on enlève l'id de sauceObject
  const sauce = new Sauce({ // on crée une instance de notre classe Sauce
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // le front end ne connaissant pas l'url de l'image (c'est le middleware multer qui le génère), il faut le définir manuellement dans un template littéral : protocol, host du serveur (la racine du serveur ou localhost:3000), répertoire, nom du fichier.
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée' }))
    .catch(error => res.status(400).json({ error }));
};


/* POST LIKE */
exports.postLike = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;

  if (like === 0) {
    Sauce.findOne({ _id: req.params.id }) // on récupère la sauce concernée
      .then((sauce) => {
        //console.log(sauce); // TEST
        if (sauce.usersLiked.includes(req.body.userId)) { // si cet utilisateur a déjà like la sauce
          Sauce.updateOne(//on modifie cette sauce
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
        if (sauce.usersDisliked.includes(req.body.userId)) { // si cet utilisateur a déjà dislike la sauce
          Sauce.updateOne( // on modifie cette sauce
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
    Sauce.updateOne(//on modifie cette sauce
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
    Sauce.updateOne(//on modifie cette sauce
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
exports.getAllSauce = (req, res, next) => {
  Sauce.find()// récuparation de la liste complète des sauces
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};


/* GET ONE SAUCE */
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) // récupération d'une sauce unique
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};


/* PUT */
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? // on crée l'objet sauceObject et on utilise l'opérateur ternaire "? {} : {}" pour savoir si req.file existe (si l'image existe)
    { // si le fichier existe
      ...JSON.parse(req.body.sauce), // on fait comme pour la route POST
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };  // si req.file n'existe pas, on envoi simplement les éléments
  if (req.file) {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {// suppression de l'image à remplacer
          Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) //mise à jour d'une sauce
            .then(() => res.status(200).json({ message: 'Sauce et image modifiée' }))
            .catch(error => res.status(400).json({ error }));
        });
      }).catch(error => res.status(400).json({ error }))
  } else {
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) //mise à jour d'une sauce
      .then(() => res.status(200).json({ message: 'Sauce modifiée' }))
      .catch(error => res.status(400).json({ error }));
  }
};

/* DELETE */

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) // on recherche l'objet qui a l'id qui correspond au paramètre de la requête pour avoir l'url de l'image (on aura alors accès au nom du fichier et pourra le supprimer)
    .then(sauce => { // on veut récupérer le nom du fichier précisément
      const filename = sauce.imageUrl.split('/images/')[1]; // on récupère l'url de l'image retourné par la base et on la split autour de la chaine de caractère "/images/". On récupère ainsi uniquement le nom du fichier
      fs.unlink(`images/${filename}`, () => { // on appelle la fonction "unlink" de fs qui permet de supprimer le fichier (1er arg : chemin de ce fichier). Le deuxième arg étant un callback qu'on lance une fois le fichier supprimé
        Sauce.deleteOne({ _id: req.params.id }) // ce callback supprime le thing de la base de donnée
          .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

