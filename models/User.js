/* const mongoose = require('mongoose'); // récupération de mongoose
const uniqueValidator = require('mongoose-unique-validator'); // récupération du package gérant la propriété "unique" afin d'éviter d'avoir plusieurs utilisateurs avec la même adresse mail

const userSchema = mongoose.Schema({
    //userId:{type:String}, // crée au moment de la connection (login) à partir du _id crée par MongoDb
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }

});

userSchema.plugin(uniqueValidator); // on applique le plugin unique validateur au schéma

module.exports = mongoose.model('User', userSchema); */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN
    })
  }