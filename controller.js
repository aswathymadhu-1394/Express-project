const mongo = require("mongodb");
const database = require("../../datas/database");
const ObjectId = mongo.ObjectId;

//Admin Home

exports.adminIndex = (req, res) => {
  res.render("admin/home",{layout: 'layout', a:true})
};



//  CATEGORY 

exports.viewcategory = (req, res) => {
  database.then((dbo) => {
    dbo.collection("categorybox").find().toArray().then((data) => {
      res.render("admin/category", {layout: 'layout', a: true, category: data });
    })
    
  });
};

exports.addcategory = (req, res) => {
  res.render("admin/addcategory", { a: true });
};

exports.categoryInsert = (req, res) => {
  var fileName = req.files.catImg.name;
  var params = {
    catName: req.body.catName,
    catDesc: req.body.catDesc,
    catImg: fileName,
  };
  database.then((dbo) => {
    dbo.collection("categorybox").insertOne(params).then(() => {
      req.files.catImg.mv("public/images/" + fileName);
      res.redirect("/admin/category");
    });
  });
};

exports.categoryDelete = (req, res) => {
  var id = req.params.id;
  database.then((dbo) => {
    dbo.collection("categorybox").deleteOne({ _id: new ObjectId(id) }).then(() => {
      res.redirect("/admin/category");
    });
  });
};

exports.categoryEdit = (req, res) => {
  var id = req.params.id;
  database.then((dbo) => {
    dbo.collection("categorybox").findOne({ _id: new ObjectId(id) }).then((cat) => {
      res.render("admin/editcategory", { a: true, category: cat });
    });
  });
};

exports.categoryUpdate = (req, res) => {
  var id = req.params.id;
  var update = {
    $set: {
      catName: req.body.catName,
      catDesc: req.body.catDesc,
      catImg: req.body.catImg,
    },
  };
  database.then((dbo) => {
    dbo.collection("categorybox").updateOne({ _id: new ObjectId(id) }, update).then(() => {
      res.redirect("/admin/category");
    });
  });
};



//  SUBCATEGORY 

exports.viewsubcategory = (req, res) => {
  database.then((dbo) => {
    dbo.collection("subcategorybox")
      .aggregate([
        {
          $lookup: {
            from: "categorybox",
            localField: "catId",
            foreignField: "_id",
            as: "category",
          },
        },
      ])
      .toArray()
      .then((data) => {
        res.render("admin/subcategory", { a: true, subcategory: data });
      });
  });
};

exports.addsubcategory = (req, res) => {
  database.then((dbo) => {
    dbo.collection("categorybox").find().toArray().then((cat) => {
      res.render("admin/addsub", { a: true, category: cat });
    });
  });
};

exports.subcategoryInsert = (req, res) => {
  var params = {
    catId: new ObjectId(req.body.catId),
    subName: req.body.subName,
  };
  database.then((dbo) => {
    dbo.collection("subcategorybox").insertOne(params).then(() => {
      res.redirect("/admin/subcategory");
    });
  });
};

exports.subcategoryDelete = (req, res) => {
  var id = req.params.id;
  database.then((dbo) => {
    dbo.collection("subcategorybox").deleteOne({ _id: new ObjectId(id) }).then(() => {
      res.redirect("/admin/subcategory");
    });
  });
};

exports.subcategoryEdit = (req, res) => {
  var id = req.params.id;
  database.then((dbo) => {
    dbo.collection("subcategorybox").findOne({ _id: new ObjectId(id) }).then((sub) => {
      dbo.collection("categorybox").find().toArray().then((cat) => {
        res.render("admin/editsubcategory", { a: true, sub: sub, category: cat });
      });
    });
  });
};

exports.subcategoryUpdate = (req, res) => {
  var id = req.params.id;
  var update = {
    $set: {
      catId: new ObjectId(req.body.catId),
      subName: req.body.subName,
    },
  };
  database.then((dbo) => {
    dbo.collection("subcategorybox").updateOne({ _id: new ObjectId(id) }, update).then(() => {
      res.redirect("/admin/subcategory");
    });
  });
};



// PRODUCT 

exports.viewproduct = (req, res) => {
  database.then((dbo) => {
    dbo.collection("productbox")
      .aggregate([
        {
          $lookup: {
            from: "categorybox",
            localField: "catId",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $lookup: {
            from: "subcategorybox",
            localField: "subId",
            foreignField: "_id",
            as: "subcategory",
          },
        },
      ])
      .toArray()
      .then((data) => {
        res.render("admin/product", { a: true, product: data });
      });
  });
};

exports.addprdt = (req, res) => {
  database.then((dbo) => {
    dbo.collection("categorybox").find().toArray().then((cat) => {
      dbo.collection("subcategorybox").find().toArray().then((sub) => {
        res.render("admin/addproduct", { a: true, category: cat, subcategory: sub });
      });
    });
  });
};

exports.productInsert = (req, res) => {
  var fileName = req.files.prdtImg.name;
  var params = {
    catId: new ObjectId(req.body.catId),
    subId: new ObjectId(req.body.subId),
    prdtName: req.body.prdtName,
    prdtDesc: req.body.prdtDesc,
    prdtPrice: req.body.prdtPrice,
    prdtImg: fileName,
  };
  database.then((dbo) => {
    dbo.collection("productbox").insertOne(params).then(() => {
      req.files.prdtImg.mv("public/images/" + fileName);
      res.redirect("/admin/product");
    });
  });
};

exports.productDelete = (req, res) => {
  var id = req.params.id;
  database.then((dbo) => {
    dbo.collection("productbox").deleteOne({ _id: new ObjectId(id) }).then(() => {
      res.redirect("/admin/product");
    });
  });
};

exports.productEdit = (req, res) => {
  var id = req.params.id;
  database.then((dbo) => {
    dbo.collection("productbox").findOne({ _id: new ObjectId(id) }).then((prd) => {
      dbo.collection("categorybox").find().toArray().then((cat) => {
        dbo.collection("subcategorybox").find().toArray().then((sub) => {
          res.render("admin/editproduct", { a: true, product: prd, category: cat, subcategory: sub });
        });
      });
    });
  });
};

exports.productUpdate = (req, res) => {
  var id = req.params.id;
  var update = {
    $set: {
      catId: new ObjectId(req.body.catId),
      subId: new ObjectId(req.body.subId),
      prdtName: req.body.prdtName,
      prdtDesc: req.body.prdtDesc,
      prdtPrice: req.body.prdtPrice,
      prdtImg: req.body.prdtImg,
    },
  };
  database.then((dbo) => {
    dbo.collection("productbox").updateOne({ _id: new ObjectId(id) }, update).then(() => {
      res.redirect("/admin/product");
    });
  });
};



//USER

exports.user = (req, res) => {
  database.then((dbo) => {
    dbo.collection("adminuserbox").find().toArray().then((data) => {
      res.render("admin/user", { a: true, user: data });
    });
  });
};

exports.addusr = (req, res) => {
  res.render("admin/adduser", { a: true });
};

exports.userInsert = (req, res) => {
  var params = {
    username: req.body.username,
    email: req.body.email,
  };
  database.then((dbo) => {
    dbo.collection("adminuserbox").insertOne(params).then(() => {
      res.redirect("/admin/user");
    });
  });
};


















































/*
//Add
exports.addprdt = (req,res) =>{
  database.then((dbo)=>{

    dbo.collection('productbox').find().toArray().then((prdt)=>{
        res.render("admin/addproduct",{prdt})
    })  
  })
}*/
