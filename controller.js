const mongo = require("mongodb");
const database = require("../../datas/database");
const ObjectId = mongo.ObjectId;


exports.userIndex = (req, res) => {
  database.then(dbo => 
    dbo.collection('categorybox').find().toArray().then(catData => 
      dbo.collection('productbox').find().toArray().then(prdData => 
        res.render('user/home', {a:false, category: catData, product: prdData})
      )
    )
  );
}

//SINGLE PRODUCT

exports.singleprdtView = (req, res) => {
  const id = req.params.id;

  database.then(dbo =>
    dbo.collection("productbox")
      .findOne({ _id: new ObjectId(id) })
      .then(prdData => {
        res.render("user/singleproduct", { a: false, product: prdData });
        console.log("Image Name:", prdData.prdtImg);
      })
      .catch(err => console.error(err))
  );
};

/*

exports.singleprdtView = (req, res) => {
  database.then((dbo) => {
    dbo.collection("productbox").find().toArray().then((data) => {
      res.render("user/singleproduct", { a: false, product: data });
    });
  });
};


exports.singleprdtPost =(req,res) => {
  //const id = req.query.id;

    const id = req.params.id;
  /*var params={
    prdtName : req.body.prdtName,
    prdtDesc : req.body.prdtDesc,
    prdtPrice : req.body.prdtPrice,
  }

  database.then((dbo) => {
      dbo.collection('productbox').findOne({ _id: new ObjectId(id) }).then((prdData) => {
    res.render("user/singleproduct",{a:false, product:prdData})
    console.log(prdData)
      })
      .catch((err) => console.error(err));
    })    
}  */



//REGISTER

exports.userRegister = (req, res) => {
  res.render("user/register")
}

  //Read

exports.userRegister = (req, res) => {
  database.then((dbo) => {
    dbo.collection("registration").find().toArray().then((result) => {
      res.render("user/register", { result , a:false });
    })
      .catch((err) => console.error(err));
  });
};


//LOGIN
exports.bookLogin = (req,res) =>{
  res.render('user/login')
}




























































//VIEW CATEGORY LIST

exports.home = function(req, res) {
  database.then(function(dbo) {
    dbo.collection("categorybox").find().toArray().then(function(categoryList) {
      dbo.collection("productbox").find().toArray().then(function(productList) {
        res.render("user/home", { category: categoryList, product: productList });
      });
    });
  });
};





//CART

exports.cartIndex =(req,res) =>{
  res.render('user/cart',{a:false})
}

exports.cartIndex = (req, res) => {
  database.then((dbo) => {
    dbo.collection("productbox").find().toArray().then((data) => {
      res.render("user/cart", { a: false, product: data });
    });
  });
};