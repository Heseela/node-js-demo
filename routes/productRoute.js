const express = require("express");
const router = express.Router();

const{
    getAllproduct,
    createproduct,
    getproductById,
   
} = require("../controllers/productcontroller.js")

const Login = require("../controllers/logincontrol.js");


router.route("/").get(getAllproduct);

router.route("/").post(createproduct);

router.route("/:id").get(getproductById);

module.exports = router