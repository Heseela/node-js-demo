const express = require ("express")
const router = express.Router();


const{
    getAllStudent,
    createStudent,
    getAllStudentById,
    updateStudent,
    createMultipleStudentBookRelation,
    // deleteStudent
} = require("../controllers/studentController.js")

const Login=require("../controllers/logincontrol.js")
const verifyToken = require("../middleware/verifyToken.js")

router.route('/').get(getAllStudent)
// router.route('/').post(createStudent)
router.route('/:id').get(getAllStudentById)
router.route('/:id').put(updateStudent)
// router.route('/:id').delete(verifyToken,deleteStudent)
router.route('/studentBookMultipleRelation').post(createMultipleStudentBookRelation)

router.route('/login').post(Login)


module.exports = router;