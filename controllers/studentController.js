const Student=require("../models/student.js")
const bcrypt = require('bcryptjs')
const Sequelize=require('sequelize')
const sequelize=require("../db.js")
const Book=require("../models/book.js")
const StudentBook = require("../models/StudentBook.js")

const getAllStudent=async(req,res)=>{
try {
    const allStudentDetails=await Student.findAll({
        attributes:{
            exclude:['password']
        }
    });
    if(allStudentDetails.length > 0){
        return res.status(200).json({message:"Student fetched Successfully!!",data:allStudentDetails})
    } else {
    return res.status(500).json({message:"Internal Server Error!!"})
        
    }
} catch (error) {
    console.log("Error",error)
    return res.status(500).json({message:"Internal Server Error!!"})
}
}

const createStudent=async(req,res)=>{
    console.log("create")
    try{
        const existingEmail=await Student.findOne({
            where:{
                email: req.body.email,
            }
        })

        const allowedGenderValues = ["male","female","others"]
        const enteredGenderValue = (req.body.gender).toLowerCase();
        if(!allowedGenderValues.includes(enteredGenderValue)){
            return res.status(400).json({message:"Invalid gender. Must be female, male or others"})
        }

        //faculty
        // const allowedFacultyValues = ["CSIT","BCA"]
        // const enteredFacultyValue = (req.body.faculty).toLowerCase();
        // if(!allowedFacultyValues.includes(enteredFacultyValue)){
        //     return res.status(400).json({message:"Invalid faculty. Must be csit or bca"})
        // }


        if (existingEmail){
            return res.status(400).json({message:"Email already exists!!"})
        }
    
        const newStudent = await Student.create({
            name:req.body.name,
            email :req.body.email ,
            address:req.body.address,
            dob:req.body.dob,
            phoneNumber:req.body.phoneNumber,
            gender:req.body.gender
        })

        if(newStudent){
            return res.status(201).json({message:"Student Created Successfully!!"})
        }else{
            return res.status(500).json({message:"Student Created Successfully!!"})
        }

    }catch(error){
            console.log("Error",error)
            return res.status(500).json({message:"Internal Server Error!!"})
    
    }

}

const createMultipleStudentBookRelation=async(req,res)=>{
try{
const {StudentId,BookId}=req.body;
// console.log(StudentId,BookId);
const isStudentExist=await Student.findByPk(StudentId);
if(!isStudentExist){
    return res.status(404).json({message:"Student not found"})
}
const isBookExist=await Book.findByPk(BookId);
if(!isBookExist){
    return res.status(404).json({message:"Book not found"})
}

const newStudentBookRelation=await StudentBook.create({
    StudentId,
    BookId
})

if(newStudentBookRelation){
    return res.status(201).json({message: "Student created successfully!!"})
} else{
   return res.status(500).json({message: "Cannot create student!!"})
}

    }catch(error){
        console.log("Error",error)
        return res.status(500).json({message:"Internal server error!!"})
    }
}

const getAllStudentById=async(req,res)=>{
    let studentId = req.params.id
try {
    const studentData = await Student.findOne({
        where: {
            id:studentId
        },
        include:[
            {
                model:Book
            }
        ]
    })

    if (studentData){
        return res.status(200).json({message:"Student fetched..",data:studentData})
    }else{
        return res.status(500).json({message:"Student not found"})
    }
} catch (error) {
    console.log("Error",error)
    return res.status(500).json({message:"Internal Server Error!!"})
}
}


const updateStudent=async(req,res)=>{
    let studentId=req.params.id;
    console.log(req.body)
    try {
      const studentData=await Student.findOne({
          where:{
              id:studentId,
          }
      })
      const existingEmail=await Student.findOne ({
          where:{
              email:req.body.email,
              id:{[Sequelize.Op.not]:studentId}//Exclude the current student from the check
          }
      })
      
      if (existingEmail){
          return res.status(400).json({message:"Email already exist!"})
      }

      if (studentData){
         const updatedStudentdata= await studentData.update({
              name:req.body.name,
              email:req.body.email,
              dob:req.body.dob,
              phoneNumber:req.body.phoneNumber,
              gender:req.body.gender,
              address:req.body.address,
            
          
          });
          res.status(200).json({message:'Student updated successfully!!'});
      }else{
          res.status(404).json({message:"Student not found"})
      }
    } catch (error) {
      console.log("Error",error);
      res.status(500).json({message:"Internal Server error!!"})
  }
    }

const deleteStudent=async(req,res)=>{
    let studentId = req.params.id
    try {
        const studentData = await Student.findOne({
            where: {
                id:studentId,
            }
        
    })
    if (studentData){
        await studentData.destroy();
        return res.status(200).json({message:'Student deleted successfully!!'});
    }else{
        return res.status(500).json({message:"Student not found"})
    }
}catch (error) {
        console.log("Error",error);
        res.status(500).json({message:"Internal server error!!"})
    }
    }
    



module.exports={
    getAllStudent,
    createStudent,
    getAllStudentById,
    createMultipleStudentBookRelation,
    updateStudent,
    deleteStudent
}



