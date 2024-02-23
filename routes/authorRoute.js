const express = require ("express")
const router = express.Router();


const{
    getAllAuthor,
    createAuthor,
} = require("../controllers/authorcontroller.js")

const Login=require("../controllers/logincontrol.js")
// const verifyToken = require("../middleware/verifyToken.js")

router.route('/').get(getAllAuthor)
router.route('/').post(createAuthor)


module.exports = router;