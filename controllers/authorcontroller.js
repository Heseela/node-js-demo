const Author=require("../models/author.js")
const bcrypt = require('bcryptjs')
const Sequelize=require('sequelize')
const sequelize=require("../db.js")

const getAllAuthor=async(req,res)=>{
try {
    const allAuthorDetails=await Author.findAll();
    if(allAuthorDetails.length > 0){
        return res.status(200).json({message:"Author Created Successfully!!",data:allAuthorDetails})
    } else {
    return res.status(500).json({message:"Internal Server Error!!"})
        
    }
} catch (error) {
    console.log("Error",error)
    return res.status(500).json({message:"Internal Server Error!!"})
}
}

const createAuthor=async(req,res)=>{
    // console.log("create")
    try{

        const newAuthor = await Author.create({
            name:req.body.name,
            address:req.body.address,
        })

        if(newAuthor){
            return res.status(201).json({message:"Author Created Successfully!!"})
        }else{
            return res.status(500).json({message:"Author Created Successfully!!"})
        }

    }catch(error){
            console.log("Error",error)
            return res.status(500).json({message:"Internal Server Error!!"})
    
    }

}

module.exports={
    getAllAuthor,
    createAuthor
}



