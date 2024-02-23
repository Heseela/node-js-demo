const db=require("../db.js")
const {DataTypes}=require ("sequelize")
const Author = require("./author.js")

const Book = db.define('Book',{
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
    edition:{
        type: DataTypes.STRING,
        allowNull: false
    },
    studentId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
    
},{
    tableName: 'books',
    timestamps: true
})

module.exports=Book;