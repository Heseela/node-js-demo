const db = require("../db.js");
const Book = require("./book.js");
const Student = require("./student.js")

const StudentBook = db.define('studentBook',
{},
{tableName:'student_books',timestamps:true});

Student.belongsToMany(Book, {through:StudentBook});
Book.belongsToMany(Student, {through:StudentBook})


module.exports=StudentBook