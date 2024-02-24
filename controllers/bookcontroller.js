const Book=require("../models/book.js")
const bcrypt = require('bcryptjs')
const Sequelize=require('sequelize')
const sequelize=require("../db.js")
const Student = require("../models/student.js")

const getAllBook=async(req,res)=>{
try {
    
    
    const allBookDetails=await Book.findAll({
        include:[
            {
                model:Student
            }
        ]
    });
    if(allBookDetails.length > 0){
        return res.status(200).json({message:"Book Created Successfully!!",data:allBookDetails})
    } else {
    return res.status(500).json({message:"Internal Server Error!!"})
        
    }
} catch (error) {
    console.log("Error",error)
    return res.status(500).json({message:"Internal Server Error!!"})
}
}

const createBook=async(req,res)=>{
    // console.log("create")

    try{
        const {name,address,edition,studentId}=req.body;

        const student=await Student.findByPk(studentId);
        if(!student){
            return res.status(404).json({message:"Student not found"})
        }
    
        const book = await Book.create({
            name,
            address,
            edition,
            studentId
        })

        if(book){
            return res.status(200).json({message:"Book Fetched Successfully!!"})
        }else{
            return res.status(500).json({message:"Book Created Successfully!!"})
        }

    }catch(error){
            console.log("Error",error)
            return res.status(500).json({message:"Internal Server Error!!"})
    
    }

}

const getBookById=async(req,res)=>{
  let bookId=req.params.id
try {
    const bookData = await Book.findOne({
        where: {
            id:bookId
        },
        
        include:[
            {
                attributes:{
                    exclude:['id']
            },  
        model:Student      
            }
        ] 

       
    })

    if (bookData){
        return res.status(200).json({message:"Book fetched..",data:bookData})
    }else{
        return res.status(500).json({message:"Book not found"})
    }
} catch (error) {
    console.log("Error",error)
    return res.status(500).json({message:"Internal Server Error!!"})
}
}

module.exports={
    getAllBook,
    createBook,
    getBookById
}



