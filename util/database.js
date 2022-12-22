const  Sequelize = require("sequelize");
const sequelize = new Sequelize('chatapp','root','ambika284devi',
  { 
    dialect: "mysql", 
    host: 'localhost'
}
);

module.exports = sequelize;