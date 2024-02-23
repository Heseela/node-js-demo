const {ENUM, Sequelize}= require("sequelize");
const bcrypt = require("bcryptjs");
const customer= require("../models/customer");
const product= require("../models/product");



const getAllproduct= async (req,res) => {

    try{
        const allproductDetails = await product.findAll({
          include: [
            {
              model: customer,
            attributes: {
              exclude: ['id']
            }
            }
          ],
        });
        if(allproductDetails.length > 0){
          return res.status(200).json({message:"product fetched successfully",data: allproductDetails})
        }else{
          return res.status(500).json({message:"Internal server error!!"})
        }
      }
  
        catch(error){
          console.log("Error",error)
          return res.status(500).json({message:"Internal server error!!"})
        }
}

const createproduct = async (req, res) => {
     try {


      const { productname, price, quantity,customerId} = req.body
          const productDetails = await customer.findByPk(customerId);

          if(!productDetails) {
            return res.status(404).json({message: 'customer not found'});
            
          }
        const newproduct = await product.create({
            productname,
            price,
            quantity,
            customerId
              })
             console.log(newproduct)
        if(newproduct) {
            return res.status(201).json({message: "Product created successfully!!"})
        } else{
            return res.status(500).json({message: "Cannot create product!!"})
        }
     }catch (error) {
        console.log("Error", error)
        return res.status(500).json({message: "Internal Server Error!!"})
     }
    }

const getproductById = async (req, res) => {
  let productId = req.params.id
  console.log(productId)
  try{
      const productData = await product.findOne({
          where: {
              id: productId,
          },
          include:[{
            model: customer,
            attributes: {
              exclude: "id"
            }
          }]
      })
        if(productData){
          return res.status(200).json({message:"product fetched..",data: bookData})
        }else{
          return res.status(500).json({message:"product not found"})
        }
  }catch(error){
         console.error("Error while fetching data",error)
         return res.status(500).json({message: "Internal server error"})
  }


};

module.exports = {
    getAllproduct,
    createproduct,
    getproductById,
    
}