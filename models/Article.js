
const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Article extends Model {

    static associate(models) {
      models.Article.belongsTo(models.User,{
        foreignKey: 'idUSERS'
      })
    }
  };

  Article.init({
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    idUSERS: DataTypes.INTEGER,
    file: DataTypes.STRING,
    selection: DataTypes.BOOLEAN,
    // PROJET D'EVOLUTION
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

