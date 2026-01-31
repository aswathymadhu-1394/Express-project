var express = require('express')
var router = express.Router()
var controller = require('./controller')
const database = require("../../datas/database");
const bcrypt = require('bcrypt')


router.get('/',controller.userIndex)


//SINGLEPRODUCT
router.get('/singleproduct/:id',controller.singleprdtView)
//router.post("/product/:id",controller.singleprdtPost)


// VIEW CATEGORY LIST
router.get("/", controller.home);

// category-wise product list
router.get("/category/:id", function(req, res) {
  var id = req.params.id;
  database.then(function(dbo) {
    // match products by category id
    dbo.collection("categorybox")
      .aggregate([
        { $match: { categoryId: id } }
      ])
      .toArray()
      .then(function(products) {
        res.render("user/categoryproduct", { products: products });
      });
  });
});



//REGISTER

router.get("/register", controller.userRegister);

//Create( Insert)

router.post('/register', (req, res) => {
    var params = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        repeatyourpassword: req.body.repeat,
        usertype: 1
    }

    database.then((dbo) => {

        bcrypt.hash(req.body.password, 10).then((resPass) => {
            params.password = resPass
            dbo.collection('registration').insertOne(params).then((result) => {
                console.log(result);
            })
        })
            .catch(err => console.error(err)
            )
    })
    res.redirect('/register')
})



//LOGIN

router.get("/login", controller.bookLogin);

//Create (Insert)

router.post('/login', (req, res) => {

    var params = {
        email: req.body.email,
        password: req.body.password
    }


    database.then((dbo) => {
        dbo.collection('registration').findOne({ email: params.email }).then((data) => {
            if (data) {

                bcrypt.compare(params.password, data.password).then((resPass) => {

                    if (resPass) {
                        if (data.usertype == 1) {
                            req.session.data = data
                            res.redirect('/')

                        }
                        else {
                            req.session.data = data
                            res.redirect('/login')
                        }
                    }
                    else {
                        console.log("invalid password");
                            res.redirect('/login')

                    }
                })
            }
            else {
                console.log("invaliduser");
                            res.redirect('/login')

            }
        })
            .catch(err => console.error(err)
            )
    })
});



//LOGOUT 

router.get('/logout',(req,res)=>{
    
    req.session.destroy((err) => {
        if (err) {
           console.error(err);
           console.log("data destroyed");
           res.redirect('/login')
        }  
           console.log("data destroyed niji",req.session);
           res.redirect('/register')


    })
 });


 
 //CART

 router.get("/cart",controller.cartIndex);

module.exports = router;