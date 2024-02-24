const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Login = async (req, res) =>{
    const { email, password} = req.body;   
     try{
        const IsEmailExist = await User.findOne({   // findone leh check garni database ma k xa vanera
            where:{
                email                // hamle email check garem  exist xh ki xaina vanera
            }
        })  
        
        if(!IsEmailExist){
            return res.status(404).json({ message : "Email not found"})
        }

        const IsPasswordValid = await bcrypt.compare(password, IsEmailExist.password)

    if(IsPasswordValid){
        const token = jwt.sign({
            UserId: IsEmailExist.id,
            email: IsEmailExist.email,
            phoneNumber: IsEmailExist.phoneNumber
        }, "secretKey",{expiresIn: 86400})

        if(token){
            return res.status(200).json({message : "Log in successfully", accessToken : token})
        } else{
            return res.status(500).json({message: " Internal server error"}); 
        }
    }else {
        return res.status(401).json({ message: "Invalid Credentails"})
    }
    }
        catch (error){
            console.log("Error", error)     
            return res.status(500).json({ message: "Internal Server Error"}) 
         }
}


module.exports = Login;