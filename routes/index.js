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
  var successMsg = req.flash('success')[0];
  Product.find(function (err, docs) {
    var productChunk = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunk.push(docs.slice(i, i + chunkSize));
    }
    res.render("shop/index", {
      title: "Shopping Cart",
      products: productChunk,
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
      return res.redirect("/");
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect("/");
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
  const mobileNumber = "085-525-9987";
  const IDCardNumber = "0-0000-00000-00-0";
  var cart = new Cart(req.session.cart);
  const amount = cart.totalPrice;
  const payload = generatePayload(mobileNumber, { amount });
  // Convert to SVG QR Code
  const options = { type: "svg", color: { dark: "#000", light: "#fff" } };
  qrcode.toString(payload, options, (err, svg) => {
    if (err) return console.log(err);
    console.log(payload)
    fs.writeFileSync("./public/QR/"+payload+".svg", svg);
  });
  res.render("shop/checkout", { total: cart.totalPrice, QRPath: payload});
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

  var order = new Order({
    user: req.user,
    cart: cart,
    address: req.body.address,
    name: req.body.name,
    phone: req.body.phone,
    paymentId: sampleFile.name
  });
  order.save(function(err, result){
    req.flash('success', 'Sucessfully brought product!') 
    req.session.cart = null;
    res.redirect('/');
  })
})

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  console.log(req.session.oldUrl)
  res.redirect("/user/signin");
}