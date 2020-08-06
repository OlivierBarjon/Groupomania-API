# Groupomania-API
OC - Projet 7 - backend

## Projet API setup : 

1- CREEZ UNE BASE DE DONNEE (MySQL 5.7) : "groupomania"
  -> CREATE DATABASE groupomania CHARACTER SET 'utf8' ;

2- INSTALLEZ LES DEPENDANCES :
 npm install

3- RENSEIGNEZ VOS VARIABLES DANS UN FICHIER .ENV (voir modèle : .env.tmpl)


4- COMMANDE MIGRATION (CREATION AUTOMATIQUE DES TABLES) :
sequelize db:migrate
(En cas de problème, installez sequelize-cli manuellement : 
sudo install sequelize-cli -g
puis lancez la commande de migration comme suit : 
node_modules/.bin/sequelize db:migrate
)

5- COMMANDE LANCEMENT SERVEUR :
nodemon serve


Pour information : la désignation d'un modérateur se fait manuellement dans la base de donnée :
UPDATE users SET isAdmin = 1 WHERE ...;


## Guidelines API :

POST : http://localhost:3000/api/auth/signup

corps de la demande : {username : string, email : string, password: string}
Type de réponse attendue : {message : string}

POST : http://localhost:3000/api/auth/signin

corps de la demande : {email : string, password : string}
Type de réponse attendue : {userId: string, token: string}

...