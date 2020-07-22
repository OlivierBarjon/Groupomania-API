const { Sequelize, DataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    username: {type:DataTypes.STRING, allowNull: false},
    email: {type:DataTypes.STRING, allowNull: false},
    password: {type:DataTypes.STRING, allowNull: false},
    imgUrl: {type:DataTypes.STRING, allowNull: false},
    isAdmin: {type:DataTypes.BOOLEAN, allowNull: false},
  },
  {freezeTableName: true}
  )
}