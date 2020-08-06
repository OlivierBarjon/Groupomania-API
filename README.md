# Groupomania-API
OC - Projet 7 - backend

## Projet API setup : 

1- CREEZ UNE BASE DE DONNEE (MySQL 5.7) : "groupomania"

2- INSTALLEZ LES DEPENDANCES :
 npm install

3- RENSEIGNEZ VOS VARIABLES DANS UN FICHIER .ENV (voir modèle : .env.tmpl)

4- COMMANDE LANCEMENT SERVEUR :
nodemon serve

5- COMMANDE MIGRATION (CREATION AUTOMATIQUE DES TABLES) :
sequelize db:migrate


## Guidelines API :

POST : http://localhost:3000/api/auth/signup

corps de la demande : {username : string, email : string, password: string}
Type de réponse attendue : {message : string}

POST : http://localhost:3000/api/auth/signin

corps de la demande : {email : string, password : string}
Type de réponse attendue : {userId: string, token: string}

...