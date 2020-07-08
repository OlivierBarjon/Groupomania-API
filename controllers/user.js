const User = require('../models/User'); // récupération du modèle user
const bcrypt = require('bcrypt'); // récupération de bcrypt
const jwt = require('jsonwebtoken'); // récupération de JWT


/* ### LOGIQUE MÉTIER ### */

/* SIGNUP */
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // on hash le mot de passe (on exécute 10 fois l'algo pour crypter correctement le mot de passe)
        .then(hash => {// on récupère le hash du mdp (c'est une promise) 
            const user = new User({ // on crée le nouveau utilisateur avec le modèle mongoose
                email: req.body.email, // on enregistre l'email du body dans le paramètre email
                password: hash  // on enregistre le hash dans le paramètre password
            });
            user.save()// on utilise la méthode save sur notre user pour l'enregistrer dans la bdd
                .then(() => res.status(201).json({ message: 'Utilisateur crée' }))
                .catch(error => res.status(500).json({ message: 'Cette adresse mail semble être déjà utilisée' }));
        })
        .catch(error => res.status(500).json({ error }));
};

/* LOGIN */
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) //on recherche l' seul utilisateur de la bdd (celui dont l'email correspond à l'email envoyé dans la requête)
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
                        userId: user._id, // avec l'identifiant
                        token: jwt.sign( // et avec un token (grâce à l'appel de la fonction sign de jwt) qui servira pour les requêtes suivantes
                            { userId: user._id }, //arg 1 = le payload (les données qu'on veut encoder dans le token)=l'id du user
                            process.env.TOKEN_KEY, // clé secrète
                            { expiresIn: '24h' } //durée de vie
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));//pour afficher un problème de connexion à mondoDb 
};