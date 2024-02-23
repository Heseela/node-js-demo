const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("db_college",'root','',{
    host:"localhost",
    dialect:"mysql"
});

module.exports=sequelize;