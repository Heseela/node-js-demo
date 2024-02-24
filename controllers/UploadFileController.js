const multer=require("multer");
const UploadFile = require("../models/UploadFile");
const bcrypt = require('bcryptjs')
const fs=require('fs/promises')
const path = require('path')


//multer configuration for handling the filename and destination of files
const storage=multer.diskStorage({
    destination:(req,file,storeFileFunction)=>{
            storeFileFunction(null,'./assets')
        },
filename:(req,file,fileInfoFunction)=>{
            const fileName=`${Date.now()}-${file.originalname}`;   //date.now le current date dinxa
            fileInfoFunction(null,fileName)
        }
    
})
const fileUploadData=multer({storage}).single('filename')


const uploadSingleFile = async(req,res)=>{
try {
    fileUploadData(req,res,async(error)=>{
        if(error){
            console.error(error);
        return res.status(500).json({error:"Error while uploading the file"})
        }
        const newFileData=await UploadFile.create({
            title:req.body.title,
            filename:req.file.filename
        
    })
    return res.status(201).json({message:"File upload successfully!!",data:newFileData})

    })
} catch (error) {
    console.error(error);
    return res.status(500).json({message:"Internal Server Error!!"})
}
}

const getAllFile=async(req,res)=>{
    try {
        const allFileDetails=await UploadFile.findAll({
           
        });
        if(allFileDetails.length > 0){
            return res.status(200).json({message:"File fetched Successfully!!",data:allFileDetails})
        } else {
        return res.status(500).json({message:"Internal Server Error!!"})
            
        }
    } catch (error) {
        console.log("Error",error)
        return res.status(500).json({message:"Internal Server Error!!"})
    }
}

const getAllFileById=async(req,res)=>{
    let fileId = req.params.id
try {
    const fileData = await UploadFile.findOne({
        where: {
            id:fileId
        },
    })

    if (fileData){
        return res.status(200).json({message:"File fetched..",data:fileData})
    }else{
        return res.status(500).json({message:"File not found"})
    }
} catch (error) {
    console.log("Error",error)
    return res.status(500).json({message:"Internal Server Error!!"})
}
}

const deleteFile=async(req,res)=>{
    let fileId = req.params.id
    try {
        const fileData = await UploadFile.findOne({
            where: {
                id:fileId,
            }
        
    })
    if (fileData){


        //delete the file from assets folder
        const filePath=path.join('./assets',fileData.filename);
        await fs.unlink(filePath)


        // delete the file record from database
        await fileData.destroy();
        return res.status(200).json({message:'file deleted successfully!!'});
    }else{
        return res.status(500).json({message:"file not found"})
    }
}catch (error) {
        console.log("Error",error);
        res.status(500).json({message:"Internal server error!!"})
    }
    }

module.exports={
    uploadSingleFile,
    getAllFile,
    getAllFileById,
    deleteFile
    
}