const db=require("../db.js")
const {DataTypes}=require ("sequelize")

const User = db.define('User',{
    // id:{
    //     type: DataTypes.INTEGER,
    //     autoincrementer: true,
    //     primaryKey: true,
    //     allowNull: false
    // },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dob:{
        type: DataTypes.DATE
    },
    phoneNumber:{
        type: DataTypes.STRING,
        allowNull: false
    },
    gender:{
        type: DataTypes.ENUM('male','female','others')
        
    }
},{
    tableName: 'users',
    timestamps: true
})

module.exports=User;