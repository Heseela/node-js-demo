const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");

const getAllUser = async (req, res) => {
  try {
    const allUserDetails = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    if (allUserDetails.length > 0) {
      return res
        .status(200)
        .json({ message: "User Created Successfully!!", data: allUserDetails });
    } else {
      return res.status(500).json({ message: "Internal Server Error!!" });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal Server Error!!" });
  }
};

const createUser = async (req, res) => {
  // console.log("create")
  try {
    const existingEmail = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    const allowedGenderValues = ["male", "female", "others"];
    const enteredGenderValue = req.body.gender.toLowerCase();
    if (!allowedGenderValues.includes(enteredGenderValue)) {
      return res
        .status(400)
        .json({ message: "Invalid gender. Must be female, male or others" });
    }

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists!!" });
    }
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    if (!hashPassword) {
      return res.status(500).json({ message: "Internl Server Error!!" });
    }
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      password: hashPassword,
      dob: req.body.dob,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
    });

    if (newUser) {
      return res.status(201).json({ message: "User Created Successfully!!" });
    } else {
      return res.status(500).json({ message: "User Created Successfully!!" });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal Server Error!!" });
  }
};

const getAllUserById = async (req, res) => {
  let userId = req.params.id;
  try {
    const userData = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (userData) {
      return res
        .status(200)
        .json({ message: "User fetched..", data: userData });
    } else {
      return res.status(500).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal Server Error!!" });
  }
};

// const updateUser=async(req,res)=>{
//     let userId = req.params.id
//     try {
//         const userData = await User.findOne({
//             where: {
//                 id:userId,
//             }
//     })
//     const existingEmail=await User.findOne({
//         where:{
//             email: req.body.email,
//         }
//     })

//     if (userData){
//         await userData.update();
//         res.status(200).json({message:'User updated successfully!!'});
//     }else{
//         res.status(500).json({message:"User not found"})
//     }

//     if (existingEmail){
//         return res.status(400).json({message:"Email already exists!!"})
//     }

// }catch (error) {
//         console.log("Error",error);
//         res.status(500).json({message:"Internal server error!!"})
//     }
// }

const updateUser = async (req, res) => {
  let userId = req.params.id;
  console.log(req.body);
  try {
    const userData = await User.findOne({
      where: {
        id: userId,
      },
    });
    const existingEmail = await User.findOne({
      where: {
        email: req.body.email,
        id: { [Sequelize.Op.not]: userId }, //Exclude the current user from the check
      },
    });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exist!" });
    }

    if (userData) {
      const updatedUserdata = await userData.update({
        name: req.body.name,
        email: req.body.email,
        dob: req.body.dob,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        address: req.body.address,
      });
      res.status(200).json({ message: "user updated successfully!!" });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal Server error!!" });
  }
};

const deleteUser = async (req, res) => {
  let userId = req.params.id;
  try {
    const userData = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (userData) {
      await userData.destroy();
      return res.status(200).json({ message: "User deleted successfully!!" });
    } else {
      return res.status(500).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal server error!!" });
  }
};


//password
const changePassword = async (req, res) => {
  const userId = req.params.id;
  const { oldPassword, newPassword, confirmNewPassword } = req.body

  try {
    const userData = await User.findOne({
      where: {
        id: userId,
      },
    })
    const checkOldPassword = userData.password;
    const isOldPasswordValid = bcrypt.compareSync(oldPassword,checkOldPassword);

    if (!isOldPasswordValid){
        return res.status(401).json({message:"Incorrect password"})
    }
    
    if (newPassword !== confirmNewPassword){
        return res.status(401).json({message:"Password doesn't match!!"})
    }

    if (userData){
        const hasNewPassword = bcrypt.hashSync(newPassword, 10)
        const updatePassword = await User.update({
            password:hasNewPassword 
        },{
            where:{
                id:userId
            }
        })
        if(updatePassword){
            return res.status(200).json({message:"Password updated successfully!!"})
        }else{
            return res.status(404).json({message:"Couldn't change password"})

        }
    }

  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Internal server errorrrr" });
  }
};





module.exports = {
  getAllUser,
  createUser,
  getAllUserById,
  updateUser,
  deleteUser,
  changePassword
};
