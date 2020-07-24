
const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Article extends Model {

    static associate(models) {
      // define association here
      models.Article.belongsTo(models.User,{
        foreignKey: {
          allowNull: false
        }
      })
      /////
    }
  };

  Article.init({
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    //idUSERS: DataTypes.INTEGER,
    file: DataTypes.STRING,
    /* likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER,
    usersLiked: DataTypes.STRING,
    usersDisliked: DataTypes.STRING */
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};

////////////////////////////

/* const User = require('./User');// récupération du modèle user ?????????
//'use strict';//??
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /*static associate(models) {
      // define association here
      models.Article.belongsTo(models.User,{
        foreignKey: {
          allowNull: false
        }
      })
      //
    }
  };
  Article.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    idUSERS: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER,
    usersLiked: DataTypes.STRING,
    usersDisliked: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
}; */