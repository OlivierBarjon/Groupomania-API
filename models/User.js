
const { Sequelize, DataTypes, Model } = require('sequelize');


module.exports = (sequelize) => {
  class User extends Model {

    static associate(models) {
      models.User.hasMany(models.Article,{
        foreignKey: 'idUSERS'
      })// define association here
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true // respect du format email)
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
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