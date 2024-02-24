const sequelize = require("../db");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const product = require("../models/product");
const customer = require("../models/customer");

const getAllcustomer= async (req,res) => {

    try{
        const allcustomerDetails = await customer.findAll({
          include: [{
            model:product
          }],
           attributes: {
             exclude: ['password']
           }
          });
          
        if(allcustomerDetails.length > 0){
          return res.status(200).json({message:"customer fetched successfully",data: allcustomerDetails})
        }else{
          return res.status(500).json({message:"Internal server error!!"})
        }
      }
  
        catch(error){
          console.log("Error",error)
          return res.status(500).json({message:"Internal server error!!"})
        }

}

const createcustomer = async (req, res) => {
     try {
        const existingEmail = await customer.findOne({
            where: {
                email: req.body.email,
            }
        })

        if(existingEmail) {
            return res.status(400).json({message: "Email already exist!!"})
        }

        const newcustomer = await customer.create({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,

        })

        if(newcustomer) {
            return res.status(201).json({message: "customer created successfully!!"})
        } else{
            return res.status(500).json({message: "Internal server error!!"})
        }
     }catch (error) {
        console.log("Error", error)
        return res.status(500).json({message: "Internal Server Error!!"})
     }
    

};

const getcustomerById = async (req, res) => {
    let customerId = req.params.id
    console.log(customerId)
    try{
        const customerData = await customer.findOne({
            where: {
                id:customerId,

            },
           include: [{
            model:product
          }]
        })
          if(customerData){
            return res.status(200).json({message:"customer fetched..",data: customerData})
          }else{
            return res.status(500).json({message:"customer not found"})
          }
    }catch(error){
           console.error("Error while fetching data",error)
           return res.status(500).json({message: "Internal server error"})
    }


}


module.exports = {
    getAllcustomer,
    createcustomer,
    getcustomerById,
    
}
