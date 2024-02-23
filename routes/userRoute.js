const express = require ("express")
const router = express.Router();


const{
    getAllUser,
    createUser,
    getAllUserById,
    updateUser,
    deleteUser,
    changePassword
} = require("../controllers/userController.js")

const Login=require("../controllers/logincontrol.js")
// const verifyToken = require("../middleware/verifyToken.js")

router.route('/').get(getAllUser)
router.route('/').post(createUser)
router.route('/:id').get(getAllUserById)
router.route('/:id').put(updateUser)
router.route('/:id').delete(deleteUser)
router.route('/login').post(Login)
router.route('/changePassword/:id').patch(changePassword)


module.exports = router;