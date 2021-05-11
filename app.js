require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const md5 = require("md5");
//const mysql = require("mysql");
const mysql = require("mysql2");
const faker = require("faker");
const validator = require("validator");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

var loggedIn = false;

var currentUser = {
  curUserId: 0,
  curUserFname: "",
  curUserLname: "",
  curUserPhone: "",
  curUserEmail: "",
  curUserAddr: "",
};

//mysql://b5cd67a2d76a54:b41d2cef@us-cdbr-east-03.cleardb.com/heroku_cebdef809dbeebc?reconnect=true
const con = mysql.createPool(
  {
    host: "us-cdbr-east-03.cleardb.com",
    user: "b5cd67a2d76a54",
    password:"b41d2cef",
    database: "heroku_cebdef809dbeebc",
  }
);

var ratings = [];

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

////// Login and Reagister Pages /////////////////////////////

app.get("/", function(req, res) {
  if (!loggedIn) res.render("home", {
    check: "nope"
  });
  else res.render("home", {
    check: "yes"
  });
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.post("/register", function(req, res) {
  const userFname = req.body.FirstName;
  const userLname = req.body.LastName;
  const userPhone = req.body.PhoneNum;
  const userEmail = req.body.Email;
  const userPass = md5(req.body.Password);
  const userAddr = req.body.Address;
  var sql = `INSERT INTO customer (FirstName, LastName, PhoneNum, Email, Password, Address) VALUES ("${userFname}", "${userLname}", "${userPhone}", "${userEmail}", "${userPass}", "${userAddr}")`;
  con.query(sql, function(err, result) {
    if (err) throw err;
  });
  res.redirect("/");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.post("/login", function(req, res) {
  const username = req.body.username;
  const password = md5(req.body.password);

  var query1 = `SELECT * FROM customer WHERE Email="${username}" AND Password="${password}"`;
  con.query(query1, function(err, result) {
    if (err) throw err;
    if (result.length === 0) {
      res.redirect("/login");
    } else {
      currentUser.curUserId = result[0].idCustomer;
      currentUser.curUserFname = result[0].FirstName;
      currentUser.curUserLname = result[0].LastName;
      currentUser.curUserPhone = result[0].PhoneNum;
      currentUser.curUserEmail = result[0].Email;
      currentUser.curUserAddr = result[0].Address;
      loggedIn = true;
      res.redirect("/");
    }
  });
});

////// Login and Register Pages end //////////////////////

//////// MENU PAGE ///////////////////////////////////////

let cart = [];

app.get("/menu", function(req, res) {
  const cardDetails = [];
  const categories = [];
  const aIndex = -1;
  con.query("SELECT * FROM recipe", function(err, results, fields) {
    if (err) throw err;
    results.forEach(function(result) {
      const tempCard = {
        cardImage: result.Image,
        cardTitle: result.Name,
        cardInfo: result.Description,
        cardCatIndex: result.idCategory,
        cardPrice: result.Price,
        cardId: result.idrecipe,
      };
      cardDetails.push(tempCard);
    });
  });
  con.query("SELECT * FROM category", function(err, results, fields) {
    if (err) throw err;
    results.forEach(function(result) {
      const tempCategory = {
        categoryId: result.idCategory,
        categoryName: result.Name,
      };
      categories.push(tempCategory);
    });
    if (!loggedIn)
      res.render("menu", {
        check: "nope",
        cards: cardDetails,
        categories: categories,
        aIndex: aIndex,
      });
    else
      res.render("menu", {
        check: "yes",
        cards: cardDetails,
        categories: categories,
        aIndex: aIndex,
      });
  });
});

app.get("/menu/:category", function(req, res) {
  const cardDetails = [];
  const categories = [];
  const aIndex = req.params.category;
  const activeIndex = req.params.category;
  con.query(`SELECT * FROM recipe WHERE idCategory = ${activeIndex}`, function(
    err,
    results,
    fields
  ) {
    if (err) throw err;
    results.forEach(function(result) {
      const tempCard = {
        cardImage: result.Image,
        cardTitle: result.Name,
        cardInfo: result.Description,
        cardCatIndex: result.idCategory,
        cardPrice: result.Price,
        cardId: result.idrecipe,
      };
      cardDetails.push(tempCard);
    });
  });
  con.query("SELECT * FROM category", function(err, results, fields) {
    if (err) throw err;
    results.forEach(function(result) {
      const tempCategory = {
        categoryId: result.idCategory,
        categoryName: result.Name,
      };
      categories.push(tempCategory);
    });
    if (!loggedIn)
      res.render("menu", {
        check: "nope",
        cards: cardDetails,
        categories: categories,
        aIndex: aIndex,
      });
    else
      res.render("menu", {
        check: "yes",
        cards: cardDetails,
        categories: categories,
        aIndex: aIndex,
      });
  });
});


var reviewsArrNames = [];
var reviewsArrReviews = [];
var reviewsArrRatings = [];
app.get("/reviews/:isbn", function(req, res) {
  reviewsArrNames = [];
  reviewsArrReviews = [];
  var temp = `${req.params.isbn}`;
  var isbnis = temp.substr(1);
  var sql = `select FirstName, LastName, rating, review from customer inner join has_ratings on customer.idCustomer = has_ratings.customer_id where recipe_id = "${isbnis}";`;
  con.query(sql, function(err, result) {
    if (err) throw err;
    for (var i = 0; i < result.length; i++) {
      reviewsArrNames.push(result[i].FirstName + result[i].LastName);
      reviewsArrReviews.push(result[i].review);
      reviewsArrRatings.push(result[i].rating);
    }
    if (!loggedIn) {
      res.render("reviews", {
        check: "nope",
        reviewsArrNames: reviewsArrNames,
        reviewsArrReviews: reviewsArrReviews,
        reviewsArrRatings: reviewsArrRatings,
        isbnval: isbnis
      })
    } else {
      res.render("reviews", {
        check: "yes",
        reviewsArrNames: reviewsArrNames,
        reviewsArrReviews: reviewsArrReviews,
        reviewsArrRatings: reviewsArrRatings,
        isbnval: isbnis
      })
    }
  })
})

app.post("/reviews/:isbn", function(req, res) {
  var temp = `${req.params.isbn}`;
  var isbnis = temp.substr(1);
  var text = req.body.rev;
  var r = req.body.rat;
  var sql = `delete from has_ratings where customer_id="${currentUser.curUserId}" and recipe_id="${isbnis}";`;
  con.query(sql, function(err, results) {
    if (err) throw err;
    var sql2 = `insert into has_ratings values ("${isbnis}", "${currentUser.curUserId}", "${r}", "${text}");`;
    con.query(sql2, function(err2, result2) {
      if (err2) throw err2;
      res.redirect("/");
    })
  })
})

app.post("/ratings/:isbn", function(req, res) {
  var temp = `${req.params.isbn}`;
  var isbnis = temp.substr(1);
  var r = req.body.rating;
  var sql = `delete from has_ratings where customer_id = "${currentUser.curUserId}" and recipe_id = "${isbnis}";`;
  con.query(sql, function(err, result) {
    if (err) throw err;
    var sql2 = `insert into has_ratings values ("${isbnis}", "${currentUser.curUserId}", "${r}");`;
    con.query(sql2, function(err2, result2) {
      if (err2) throw err2;
      res.redirect("/menu");
    })
  })
})


/////// Menu PAGE END ////////////////////////////////

/////// My cart /////////////////////////////////////
var currentOrderId;
var status = 0;

app.get("/mycart", function(req, res) {
  const cardDetails = [];
  con.query("SELECT * FROM recipe", function(err, results, fields) {
    if (err) throw err;
    results.forEach(function(result) {
      const tempCard = {
        cardImage: result.Image,
        cardTitle: result.Name,
        cardInfo: result.Description,
        cardCatIndex: result.idCategory,
        cardPrice: result.Price,
        cardId: result.idrecipe,
        cardQuantity: 0,
      };
      for (let i = 0; i < cart.length; i++) {
        if (tempCard.cardId === cart[i].index) {
          cardDetails.push(tempCard);
          tempCard.cardQuantity = cart[i].quantity;
        }
      }
      //cardDetails.push(tempCard);
    });
    if (!loggedIn) {
      res.render("mycart", {
        check: "nope",
        cards: cardDetails,
        status: status,
        currentOrderId: currentOrderId
      });
    } else {
      res.render("mycart", {
        check: "yes",
        cards: cardDetails,
        status: status,
        currentOrderId: currentOrderId
      });
    }
  });
});

app.get("/checkstatus/:orderid", function(req, res) {
  const orderid = req.params.orderid;
  var sql = `SELECT Status FROM orders WHERE idorders = '${orderid}'`;
  con.query(sql, function(err, results) {
    if (err) throw err;
    status = results[0].Status;
    res.redirect("/mycart");
  })
})


app.post("/mycart", function(req, res) {
  res.send("Added to cart");
  let newIndex = parseInt(req.body.index);
  //cart.push(newIndex);
  let flag = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].index === newIndex) {
      cart[i].quantity = cart[i].quantity + 1;
      flag = true;
    }
  }
  if (flag === false) {
    cart.push({
      index: newIndex,
      quantity: 1
    });
  }
});

app.delete("/mycart/:index", function(req, res) {
  let newIndex = parseInt(req.params.index);
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].index === newIndex) {
      cart.splice(i, 1);
    }
  }
  res.redirect("/mycart");
})

//////////// My cart end ///////////////////////////

/////// place order ///////////////////////////////


app.post("/placeorder", function(req, res) {
  if (!loggedIn) {
    res.send("Please Sign in before u can place an order");
  } else {
    const recievedAddress =
      req.body.flatNumber +
      "," +
      req.body.streetName +
      "," +
      req.body.area +
      "," +
      req.body.landmark +
      "," +
      req.body.city;
    const currentdate = new Date();
    const toInsertDate =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear();
    const toInsertTime =
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();

    async function makeQuery() {
      var sql = `INSERT INTO orders (idCustomer, Date, Time, Address, Status) VALUES ("${currentUser.curUserId}", "${toInsertDate}", "${toInsertTime}", "${recievedAddress}", "1")`;
      const promisePool = con.promise();
      const [result] = await promisePool.query(sql);
      currentOrderId = result.insertId;
      status = 1;
      for (var i = 0; i < cart.length; i++) {
        var sql2 = `INSERT INTO orderitems (orderid, recipeid, quantity) VALUES ("${currentOrderId}", "${cart[i].index}", "${cart[i].quantity}")`;
        await promisePool.query(sql2);
      }
      res.redirect("/mycart");
    }
    makeQuery();
  }
});

//////////place order end /////////////////////



//////////// Update Profile /////////////////////////

app.get("/updateProfile", function(req, res) {
  res.render("updateProfile", {
    profile: currentUser
  });
});

app.post("/updateProfile", function(req, res) {
  const changeFname = req.body.FirstName;
  const changeLname = req.body.LastName;
  const changeAddr = req.body.Address;
  var sql = `UPDATE customer SET FirstName = "${changeFname}", LastName = "${changeLname}", Address = "${changeAddr}" WHERE Email = "${currentUser.curUserEmail}"`;
  con.query(sql, function(err, result) {
    if (err) throw err;
    currentUser.curUserFname = changeFname;
    currentUser.curUserLname = changeLname;
    currentUser.curUserAddr = changeAddr;
  });
  //////
  //////
  res.redirect("/");
});

//// UPDATE profile end ////////////////////////

//// Change Password ///////////////////////////

app.get("/changePassword", function(req, res) {
  res.render("changePassword");
});

app.post("/changePassword", function(req, res) {
  const oldPassword = md5(req.body.oldPass);
  const newPassword = md5(req.body.newPass);
  const confirmPassword = md5(req.body.confirmPass);

  con.query(
    `SELECT Password FROM customer WHERE Email = "${currentUser.curUserEmail}"`,
    function(error1, foundUser) {
      if (error1) throw error1;
      if (foundUser[0].Password === oldPassword) {
        if (newPassword === confirmPassword) {
          var sql = `UPDATE customer SET Password = "${newPassword}" WHERE Password = "${oldPassword}"`;
          con.query(sql, function(err, result) {
            if (err) throw err;
          });
        }
      } else {
        console.log("Incorrect input given!");
      }
    }
  );
  res.redirect("/");
});

//// Change Password End ///////////////////////

// Admin
var adminLoggedIn = false;
app.get("/adminlogin", function(req, res) {
  res.render("adminlogin");
});

app.post("/adminlogin", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  var query1 = `SELECT * FROM admins WHERE admin_email="${username}" AND admin_pwd="${password}"`;
  con.query(query1, function(err, result) {
    if (err) throw err;
    if (result.length === 0) {
      res.redirect("/adminlogin");
    } else {
      adminLoggedIn = true;
      res.redirect("admin/dashboard");
    }
  });
});

// Admin Dashboard

app.get("/admin/dashboard", function(req, res) {
  if (adminLoggedIn) {
    var arr = [];
    async function makeQuery() {
      var sql2 = `SELECT idorders FROM orders`;
      const promisePool = con.promise();
      const [results2, fields2] = await promisePool.query(sql2);
      arr.push(results2.length);
      for (var i = 1; i < 6; i++) {
        var sql = `SELECT idorders FROM orders WHERE Status = '${i}'`;
        const [results, fields] = await promisePool.query(sql);
        arr.push(results.length);
      }
      res.render("adminDashboard", {
        arr: arr
      });
    }
    makeQuery();
  } else
    res.send("sign in pls");
});

app.get("/admin/orders/:status", function(req, res) {
  var status = parseInt(req.params.status);

  var orderArray = [];
  var sql;
  if (status != 0) {
    sql = `SELECT idorders, Date, Time FROM orders WHERE Status = '${status}'`;
  } else {
    sql = `SELECT idorders, Date, Time FROM orders`;
  }
  con.query(sql, function(err, results) {
    if (err) throw err;
    results.forEach((result) => {
      var tempObject = {
        idorders: result.idorders,
        Date: result.Date,
        Time: result.Time,
      }
      orderArray.push(tempObject);
    })
    res.render("adminorders", {
      orderArray: orderArray
    });
  })
})

app.get("/admin/order/:orderid", function(req, res) {
  var requiredOrderId = req.params.orderid;
  async function makeQuery() {
    var orderDetails = [];
    var sql = `SELECT idCustomer, Address, Status FROM orders WHERE idorders = '${requiredOrderId}'`;
    const promisePool = con.promise();
    const [results, fields] = await promisePool.query(sql);
    var userId = results[0].idCustomer;
    var delAddress = results[0].Address;
    var statusCode = results[0].Status;
    var sql2 = `SELECT FirstName, LastName, PhoneNum, Email FROM customer WHERE idcustomer = '${userId}'`;
    const [results2, fields2] = await promisePool.query(sql2);
    var userDetails = {
      orderNumber: requiredOrderId,
      FirstName: results2[0].FirstName,
      LastName: results2[0].LastName,
      PhoneNum: results2[0].PhoneNum,
      Email: results2[0].Email,
      delAddress: delAddress,
      statusCode: statusCode
    };
    var sql3 = `SELECT recipeid, quantity FROM orderitems WHERE orderid = '${requiredOrderId}'`;
    const [results3, fields3] = await promisePool.query(sql3);
    for (let i = 0; i < results3.length; i++) {
      var sql4 = `SELECT Name FROM recipe WHERE idrecipe = '${results3[i].recipeid}'`;
      const [results4, fields4] = await promisePool.query(sql4);
      var tempObj = {
        foodName: results4[0].Name,
        foodQuantity: results3[i].quantity
      };
      orderDetails.push(tempObj);
    }
    res.render("adminspecificorder", {
      userDetails: userDetails,
      orderDetails: orderDetails
    });
  }
  makeQuery();
})

app.post("/admin/order/:orderid", function(req, res) {
  var requiredOrderId = req.params.orderid;
  var statusString = req.body.newStatus;
  var statusCode;
  if (statusString === 'New Order') {
    statusCode = 1;
  } else if (statusString === 'Confirm Order') {
    statusCode = 2;
  } else if (statusString === 'Food Dispatched') {
    statusCode = 3;
  } else if (statusString === 'Food Delivered') {
    statusCode = 4;
  } else if (statusString === 'Cancelled') {
    statusCode = 5;
  }

  var sql = `UPDATE orders SET Status = '${statusCode}' WHERE idorders = '${requiredOrderId}'`;
  con.query(sql, function(err, results) {
    if (err) throw err;
    res.redirect("/admin/order/" + requiredOrderId);
  })
})

// Food Menu

app.get("/admin/showfoodmenu", function(req, res) {
  const menuArray = [];
  async function makeQuery() {
    var sql = `SELECT Name, idCategory FROM recipe`;
    const promisePool = con.promise();
    const [results, fields] = await promisePool.query(sql);
    for (var i = 0; i < results.length; i++) {
      var tempCatId = results[i].idCategory;
      var tempCatName;
      var sql2 = `SELECT Name FROM category WHERE idCategory = '${tempCatId}'`;
      const [results2, fields2] = await promisePool.query(sql2);
      tempCatName = results2[0].Name;
      var newObject = {
        categoryName: tempCatName,
        recipeName: results[i].Name
      };
      menuArray.push(newObject);
    }
    res.render("adminshowfoodmenu", {
      menuArray: menuArray
    });
  }
  makeQuery();
});

app.get("/admin/addrecipe", function(req, res) {
  const categoryArray = [];
  con.query("SELECT Name FROM category", function(err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
      categoryArray.push(results[i].Name);
    }
    res.render("adminaddrecipe", {
      categoryArray: categoryArray
    });
  })
})

app.post("/admin/addrecipe", function(req, res) {
  var recipeCategory = req.body.recipeCategory;
  var recipeName = req.body.recipeName;
  var recipeDescription = req.body.recipeDescription;
  var recipeImage = req.body.recipeImage;
  var recipePrice = req.body.recipePrice;
  async function makeQuery() {
    var sql = `SELECT idCategory FROM category WHERE Name = '${recipeCategory}'`;
    const promisePool = con.promise();
    const [results, fields] = await promisePool.query(sql);
    var recipeId = results[0].idCategory;
    var sql2 = `INSERT INTO recipe (Name, Description, idCategory, Price, Image) VALUES ('${recipeName}', '${recipeDescription}', '${recipeId}', '${recipePrice}', '${recipeImage}')`;
    const [results2, fields2] = await promisePool.query(sql2);
    res.redirect("/admin/showfoodmenu");
  }
  makeQuery();
})

// Food Category

app.get("/admin/showfoodcategory", function(req, res) {
  const categoryArray = [];
  con.query("SELECT Name FROM category", function(err, results) {
    if (err) throw err;
    results.forEach((result) => {
      var newObject = {
        Name: result.Name
      };
      categoryArray.push(newObject);
    })
    res.render("adminshowfoodcategory", {
      categoryArray: categoryArray
    });
  })
});

app.delete("/admin/showfoodcategory/:categoryName", function(req, res) {
  var deletingName = req.params.categoryName;
  var sql = `DELETE FROM category WHERE Name = '${deletingName}'`;
  con.query(sql, function(err, result) {
    if (err) throw err;
    res.redirect("/admin/showfoodcategory");
  })
})

app.get("/admin/addfoodcategory", function(req, res) {
  res.render("adminfoodcategory");
})

app.post("/admin/addfoodcategory", function(req, res) {
  var newCategory = req.body.category;
  var sql = `INSERT INTO category (Name) VALUES ("${newCategory}")`;
  con.query(sql, function(err, result) {
    if (err) throw err;
    res.redirect("/admin/showfoodcategory");
  })
})

// Existing Users

app.get("/admin/users", function(req, res) {
  const usersArray = [];
  con.query("SELECT FirstName, LastName, PhoneNum, Email FROM customer", function(err, results) {
    if (err) throw err;
    results.forEach((result) => {
      var newObject = {
        FirstName: result.FirstName,
        LastName: result.LastName,
        PhoneNum: result.PhoneNum,
        Email: result.Email
      };
      usersArray.push(newObject);
    })
    res.render("adminUsers", {
      usersArray: usersArray
    });
  })
});

app.get("/ContactUs", function(req, res) {
  res.render("contactus");
});

app.get("/AboutUs", function(req, res) {
  res.render("aboutus");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function () {
  console.log("Server has started successfully");
});


exports.app = app;