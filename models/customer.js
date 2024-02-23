const db = require("../db")
 const { DataTypes } = require("sequelize")
 const product = require("./product")

 const customer = db.define('customer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },

    phoneNumber: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'customer',
    timestamps: false
 })


customer.hasMany(product, { foreignKey: "customerId"});
product.belongsTo(customer, {foreignkey:"customerId"});

module.exports = customer;