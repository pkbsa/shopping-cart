var express = require("express");
var router = express.Router();
var Cart = require("../models/cart");

var generatePayload = require("promptpay-qr");
var qrcode = require("qrcode");
var fs = require("fs");

var Product = require("../models/product");
var Order = require('../models/order');

/* GET home page. */
router.get("/", function (req, res, next) {
  
    res.render("shop/index", {
      title: "Shopping Cart"
    });
 
});

router.get("/products", function (req, res, next) {
  var successMsg = req.flash('success')[0];
  Product.find(function (err, docs) {
    var productChunk = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunk.push(docs.slice(i, i + chunkSize));
    }
    res.render("shop/products", {
      title: "Shopping Cart",
      products: docs,
      successMsg: successMsg || null,
      noMessages: !successMsg
    });
  });
});

router.get("/add-to-cart/:id", function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect("/products");
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect("/products");
  });
});

router.get("/addone-to-cart/:id", function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect("/products");
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect("/shopping-cart");
  });
});

router.get('/remove/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/reduce/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});



router.get("/shopping-cart", function (req, res, next) {
  if (!req.session.cart) {
    return res.render("shop/shopping-cart", { products: null });
  }
  var cart = new Cart(req.session.cart);
  res.render("shop/shopping-cart", {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice,
  });
});

router.get("/checkout",isLoggedIn,function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect("/shopping-cart");
  }
  var cart = new Cart(req.session.cart);
  res.render("shop/checkout", { products: cart.generateArray(),
    total: cart.totalPrice+30,
    users: req.user,
  });
});

router.post('/checkout',isLoggedIn, function(req, res, next){
  if (!req.session.cart) {
    return res.redirect("/shopping-cart");
  }

  var cart = new Cart(req.session.cart);

  let sampleFile;
  let uploadFile;

  console.log(req.files.sampleFile)
  sampleFile = req.files.sampleFile;
  uploadFile = './public/Slip/' + sampleFile.name;

  sampleFile.mv(uploadFile);
  
  const today = new Date();
  const offset = -(today.getTimezoneOffset() / 60) + 7;
  const thaiDate = new Date(today.getTime() + offset * 60 * 60 * 1000);
  const date = thaiDate.toLocaleString("th-TH", {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric"
  });

  var order = new Order({
    user: req.user,
    cart: cart,
    address: req.body.address,
    name: req.body.name,
    phone: req.body.phone,
    paymentId: sampleFile.name,
    status: "Pending",
    date: date
  });
  order.save(function(err, result){
    if (err){ 
      console.log(err)
    }
    req.flash('success', 'Sucessfully brought product!') 
    req.session.cart = null;
    res.redirect('/products');
  })
})


module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.originalUrl;
  console.log(req.session.oldUrl)
  res.redirect("/user/signin");
}
