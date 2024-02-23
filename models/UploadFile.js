const db=require("../db.js")
const {DataTypes}=require ("sequelize");



const UploadFile = db.define('UploadFile',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    filename:{
        type: DataTypes.STRING,
        allowNull: false
    }
    
},{
    tableName: 'Upload-Files',
    timestamps: true
})



module.exports=UploadFile