const { Sequelize } = require('sequelize');// on récupère sequelize

const sequelize = new Sequelize('groupomania', 'root', 'root',{ // 'database', 'username', 'password'
	host: 'localhost',
	dialect: 'mysql'
});
//console.log(sequelize);

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((err) => console.log('Unable to connect to the database:', err));


  module.exports= sequelize;