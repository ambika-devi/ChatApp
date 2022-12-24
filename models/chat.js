const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const Chat=sequelize.define("chatMessages",{
    id: {
       type:Sequelize.INTEGER,
       primaryKey:true,
       autoIncrement:true,
       unique:true
       },
       chatMessage: {
        type:Sequelize.STRING,
        allowNull:false
       },
       toUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
module.exports=Chat;