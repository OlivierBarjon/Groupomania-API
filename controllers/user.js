const UserModelBuilder = require('../models/User');// récupération du modèle user
const bcrypt = require('bcrypt'); // récupération de bcrypt
const jwt = require('jsonwebtoken'); // récupération de JWT
const sequelize = require('../database.js'); // récupération de la base de donnée

const fs = require('fs'); //package de suppression des fichiers
const ArticleModelBuilder = require('../models/Article');// récupération du modèle article

/* ### LOGIQUE MÉTIER ### */

/* SIGNUP */
exports.signup = (req, res, next) => {
    //console.log(req.get("sequelize"));
    const User = UserModelBuilder(sequelize);
    //console.log(User);
    bcrypt.hash(req.body.password, 10) // on hash le mot de passe (on exécute 10 fois l'algo pour crypter correctement le mot de passe)
        .then(hash => {// on récupère le hash du mdp (c'est une promise) 
            const user = new User({ // on crée le nouveau utilisateur avec le modèle sequelize
                username: req.body.username,
                email: req.body.email, // on enregistre l'email du body dans le paramètre email
                password: hash,  // on enregistre le hash dans le paramètre password
                //isAdmin: req.body.isAdmin // ??????? / on enregistre si oui ou non il s'agit d'un utilisateur possédant le rôle de modérateur
            });
            user.save()// on utilise la méthode save sur notre user pour l'enregistrer dans la bdd
                .then(() => res.status(201).json({ message: 'Utilisateur crée' }))
                .catch(error => res.status(500).json({ message: 'Cette adresse mail et\\ou ce nom d\'utilisateur semble être déjà utilisé' }));
        })
        .catch(error =>console.log(error) || res.status(500).json({ error : "erreur signup" }));
};


/* SIGNIN (LOGIN) */
exports.signin = (req, res, next) => {
    const User = UserModelBuilder(sequelize);
    User.findOne({ where: {email: req.body.email} }) //on recherche le seul utilisateur de la bdd (celui dont l'email correspond à l'email envoyé dans la requête)
        .then(user => {// on doit vérifier si on a récupéré un user ou non
            if (!user) { // si non :
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password) // si oui, on utilise la méthode compare de bcrypt pour comparer le mdp envoyé et le hash de la bdd
                .then(valid => { // on recoit un boolean 
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({ // si c'est "valid" = true, on renvoi un objet json
                        userId: user.id, // avec l'identifiant
                        token: jwt.sign( // et avec un token (grâce à l'appel de la fonction sign de jwt) qui servira pour les requêtes suivantes
                            { userId: user.id }, //arg 1 = le payload (les données qu'on veut encoder dans le token)=l'id du user
                            process.env.TOKEN_KEY, // clé secrète
                            { expiresIn: '24h' } //durée de vie
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error : "erreur signin" }));//pour afficher un problème de connexion 
};


/* DELETE USER */


  exports.deleteUser = (req, res, next) => {
    const User = UserModelBuilder(sequelize);
    const Article = ArticleModelBuilder(sequelize);
    User.findOne({ where: {email: req.body.email} }) //on recherche le seul utilisateur de la bdd (celui dont l'email correspond à l'email envoyé dans la requête)
        .then(user => {// on doit vérifier si on a récupéré un user ou non
            if (!user) { // si non :
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password) // si oui, on utilise la méthode compare de bcrypt pour comparer le mdp envoyé et le hash de la bdd
                .then(valid => { // on recoit un boolean 
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }else {
                            ///// On supprime les articles de cet utilisateur
                            Article.findAll({ where:{ idUSERS: req.body.userId } }) // on recherche les objets 
                            .then(articles => { // 
                                //console.log(articles);
                                 for (let a in articles){
                                    //console.log(articles[a]);//TEST
                                    const art = articles[a];
                                    //console.log(art.dataValues.file);//TEST
                                    const filename = art.dataValues.file.split('/images/')[1]; //
                                    console.log(filename); 
                                    fs.unlink(`images/${filename}`, () => { // suppression de l'image et de l'article
                                        Article.destroy({ where:{ id: art.dataValues.id } }) // 
                                        .then(() => res.status(200).json({ message: 'Article supprimé !' }))
                                        .catch(error => res.status(400).json({ error : 'articledestroy' }));
                                    });
                                };
                            })
                            .catch(error => res.status(500).json({ error : "pas d'article trouvé articlefindall" }));
                            //////// On supprime l'utilisateur
                            User.destroy({ where: {email: req.body.email} }) 
                                .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
                                .catch(error => res.status(400).json({ error : "userdestroy" })); 
                    }
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error :"suppression impossible userfindone"  }));
};