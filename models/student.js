const db=require("../db.js")
const {DataTypes}=require ("sequelize");
const Book = require("./book.js");

const Student = db.define('Student',{
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    // password:{
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    dob:{
        type: DataTypes.DATE,
        allowNull: false
    },
    phoneNumber:{
        type: DataTypes.STRING,
        allowNull: false
    },
    gender:{
        type: DataTypes.ENUM('male','female','others')
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false
    }
    
},{
    tableName: 'students',
    timestamps: true
})

// define one-to-one relationship between book and student
// Student.hasOne(Book,{foreignKey:"studentId"});
// Student.hasMany(Book,{foreignKey:"studentId"});

// Book.belongsTo(Student,{foreignKey:"studentId"});
// Book.belongsToMany(Student,{foreignKey:"studentId"});


module.exports=Student