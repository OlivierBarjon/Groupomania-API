const mongoose = require('mongoose'); // récupération de mongoose

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true }, // id de l'utilisateur qui a crée la sauce
    name: { type: String, required: true }, // nom de la sauce
    manufacturer: { type: String, required: true }, // fabricant de la sauce
    description: { type: String, required: true }, // description de la sauce
    mainPepper: { type: String, required: true }, // principal ingrédient dans la sauce
    imageUrl: { type: String, required: true }, // url de l'image de la sauce téléchargée par l'utilisateur
    heat: { type: Number, required: true }, // note de 1 à 10
    likes: { type: Number, default: 0 }, // nombre d'utilisateur qui aiment la sauce
    dislikes: { type: Number, default: 0 }, //nombre d'utilisateur qui n'aiment pas la sauce
    usersLiked: { type: [String] }, // tableau d'id d'utilisateur(s) ayant aimé la sauce
    usersDisliked: { type: [String] }// tableau d'id d'utilisateur(s) n'ayant pas aimé la sauce
});

module.exports = mongoose.model('Sauce', sauceSchema);