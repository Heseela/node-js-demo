const express = require("express"); //commonjs way
const dotenv = require("dotenv").config();
const sequelize=require('./db.js')
const bodyParser = require('body-parser')
const User=require("./models/user.js");
const Student = require("./models/student.js");
const Author=require("./models/author.js")
const Book=require("./models/book.js")
const Product=require("./models/product.js")
const Customer=require("./models/customer.js");
const StudentBook = require("./models/StudentBook.js");
const UploadFile=require("./models/UploadFile.js")

const app= express();
const port= process.env.PORT || 5000 ;
app.get('/', (req,res)=>{
    res.send("Welcome to Nodejs Backend Server")
})

// // userRoute Middleware
app.use(bodyParser.json());
// sequelize.sync({force:true});
// Student.sync();
// StudentBook.sync({force:true});
app.use('/api/user',require("./routes/userRoute.js"))
app.use('/api/author',require("./routes/authorRoute.js"))
app.use('/api/book',require("./routes/bookRoute.js"))
app.use('/api/student',require("./routes/studentRoute.js"))
app.use('/api/product',require("./routes/productRoute.js"))
app.use('/api/customer',require("./routes/customerRoute.js"))
app.use('/api/upload',require("./routes/FileUploadRoute.js"))

sequelize.sync()

try{
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`)
    })
}catch(error){
    console.log('Unable to connect to the database:',error);
}

