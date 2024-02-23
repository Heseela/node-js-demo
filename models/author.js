const db=require("../db.js")
const {DataTypes}=require ("sequelize")

const Author = db.define('Author',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false
    }
    
},{
    tableName: 'authors',
    timestamps: true
})

module.exports=Author;