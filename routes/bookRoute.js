const express = require ("express")
const router = express.Router();


const{
    getAllBook,
    createBook,
    getBookById
} = require("../controllers/bookcontroller.js")

const Login=require("../controllers/logincontrol.js")
// const verifyToken = require("../middleware/verifyToken.js")

router.route('/').get(getAllBook)
router.route('/').post(createBook)
router.route('/:id').get(getBookById)


module.exports = router;