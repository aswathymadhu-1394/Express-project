var express = require("express");
var router = express.Router();
var controller = require("./controller");
const database = require("../../datas/database");
const bcrypt = require('bcrypt')

//Admin Home
router.get('/',controller.adminIndex)


// CATEGORY
router.get("/category", controller.viewcategory);
router.get("/addcategory", controller.addcategory);
router.post("/addcategory", controller.categoryInsert);
router.get("/deletecategory/:id", controller.categoryDelete);
router.get("/editcategory/:id", controller.categoryEdit);
router.post("/editcategory/:id", controller.categoryUpdate);


// SUBCATEGORY
router.get("/subcategory", controller.viewsubcategory);
router.get("/addsub", controller.addsubcategory);
router.post("/addsub", controller.subcategoryInsert);
router.get("/deletesubcategory/:id", controller.subcategoryDelete);
router.get("/editsubcategory/:id", controller.subcategoryEdit);
router.post("/editsubcategory/:id", controller.subcategoryUpdate);


// PRODUCT
router.get("/product", controller.viewproduct);
router.get("/addproduct", controller.addprdt);
router.post("/addproduct", controller.productInsert);
router.get("/deleteproduct/:id", controller.productDelete);
router.get("/editproduct/:id", controller.productEdit);
router.post("/editproduct/:id", controller.productUpdate);


// USER
router.get("/user", controller.user);
router.get("/adduser", controller.addusr);
router.post("/adduser", controller.userInsert);




module.exports = router;