const db = require("../db")
 const { DataTypes } = require("sequelize")
//  const customer = require("./customer")

 const product = db.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    productname: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    },
    quantity: {
        type: DataTypes.STRING
    },

    customerId: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'product',
    timestamps: false
 })

module.exports = product;