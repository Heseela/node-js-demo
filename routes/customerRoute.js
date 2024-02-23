const express = require("express");
const router = express.Router();

const{
    getAllcustomer,
    createcustomer,
    getcustomerById,
   
} = require("../controllers/customercontroller.js")

const Login = require("../controllers/logincontrol.js");
//const verifytoken = require("../middleware/verifytoken.js");

router.route("/").get(getAllcustomer);

router.route("/").post(createcustomer);

router.route("/:id").get(getcustomerById);

module.exports = router
