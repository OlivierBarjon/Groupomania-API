
const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {

    static associate(models) {
      models.User.hasMany(models.Article)// define association here
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};



//////////

/* const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('mysql::memory');

class User extends Model {}

User.init({
  // Model attributes are defined here
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  password: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  isAdmin: {
    type: DataTypes.BOOLEAN
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  tableName: "users",
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
}); */