// token- header,payload,signature

const jwt = require("jsonwebtoken");

function verifyToken(req, res, next){  //get the token from request headers
  try{
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)

    if(!token){
        return res.json(401).json({ message:" Invalid Token"})
    }
    //verify token
    const decodeToken = jwt.verify(token, "secretKey")
    // req.userData = decodeToken;
    req.studentData = decodeToken;

    next();
  } catch(error){
    if(error.name === "JsonWebTokenError"){
      return res.status(403).json({message:"Forbidden. Invalid Token!!"})
    }else if(error.name === "TokenExpiredError"){
      return res.status(403).json({message:"Unauthorized. Token has expired!!"})
    }else{
      console.error("Error during token verification",error);
      return res.status(500).json({message:"Internal Server Error"})
    }
  }
}

module.exports = verifyToken
