const express = require('express'); // on importe express
const app = express(); // création d'une application express
const { Sequelize } = require('sequelize');// on récupère sequelize

const bodyParser = require('body-parser');// on récupère le bodyparser
const helmet = require('helmet'); // on récupère Helmet (sécurise les appli Express en définissant divers en-têtes HTTP)
//require('dotenv').config() /*On récupère les variables d'environnement */

//const articleRoutes = require('./routes/article'); // on récupère les routes pour les articles
const userRoutes = require('./routes/user'); // on récupère les routes pour user
//const path = require('path'); // on récupère l'élément de node.js permettant d'accéder au chemin de notre systeme de fichiers
//const { Server } = require('http');


/*CROSS ORIGIN RESOURCE SHARING */
 app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*'); //l'origine qui a le droit d'accéder à notre api = tout le monde
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content, Accept, Content-Type, Authorization'); //on autorise certains headers
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // on autorise certaines méthodes
	next()
}); 

/* BODY PARSER */
//app.use(bodyParser.urlencoded({ extended: true })); // on applique une fonction du body parser qui nous servira pour express mongo sanitize
app.use(bodyParser.json()); //.json est une méthode de l'objet bodyParser qui va transformer le corps des requêtes en objets JSON
//app.use(mongoSanitize()); // MONGO SANITIZE !!!!!! to remove prohibed characters

/* HELMET */
app.use(helmet());

/* CHEMIN D'ACCES DES ENDPOINTS */

//app.use('/api/article', articleRoutes);// 
app.use('/api/auth', userRoutes);
//app.use('/images', express.static(path.join(__dirname, 'images'))) // on veut que cette requête serve le dossier statique /image dont l'adresse est déterminé par la méthode path.join (avec __dirname = nom du dossier dans lequel on va se trouver auquel on va ajouter "images" ?????????????????????????????????????????????????????????

// app.use authentification une fois la base de donnée appellée

// EXPORT SERVER

module.exports = app; // export de l'application express (pour le serveur node.js)

