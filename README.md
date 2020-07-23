# Groupomania-API
OC - Projet 7 - backend

## Projet API setup

...

COMMANDE SERVEUR :
nodemon serve


COMMANDE MIGRATION :

sequelize db:migrate


GUIDELINES API :

POST : http://localhost:3000/api/auth/signup

corps de la demande : {username : string, email : string, password: string, isAdmin: boolean}
Type de réponse attendue : {message : string}

POST : http://localhost:3000/api/auth/signin

corps de la demande : {email : string, password : string}
Type de réponse attendue : {userId: string, token: string}