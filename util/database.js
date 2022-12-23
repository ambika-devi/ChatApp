const  Sequelize = require("sequelize");
const sequelize = new Sequelize('chatapp1','root','ambika284devi',
  { 
    dialect: "mysql", 
    host: 'localhost'
}
);

module.exports = sequelize;