
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
      /* models.Article.hasOne(models.User,{
        foreignKey: {
          allowNull: false
        }
      }) */
    }
  };

  Article.init({
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    idUSERS: DataTypes.INTEGER,
    file: DataTypes.STRING,
    selection: DataTypes.BOOLEAN,
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

