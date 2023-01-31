var express = require("express");
var router = express.Router();
var csrf = require("csurf");
var passport = require("passport");

var User = require("../models/user");
var Order = require("../models/order");
var Cart = require("../models/cart");

var csrfProtection = csrf();
router.use(csrfProtection);

router.get("/profile", isLoggedIn, function (req, res, next) {
  //console.log(req.user)
  Order.find({ user: req.user }, function (err, orders) {
    if (err) {
      return res.write("Error!");
    }
    var cart;
    //console.log(orders)
    orders.forEach(function (order) {
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });
    res.render("user/profile", {
      orders: orders,
      users: req.user,
      csrfToken: req.csrfToken(),
    });
  });
});
router.post("/edit-profile", isLoggedIn, function (req, res, next) {
  console.log(req.body);
  User.updateOne(
    { email: req.body.email },
    { $set: { 
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address,
      subdistrict: req.body.subdistrict,
      district: req.body.district,
      province: req.body.province,
      zipcode: req.body.zipcode,
      phone: req.body.phone,
    } },
    function (err, res) {
      if(err){
        console.log(err);
      }
      console.log(res);
    }
  );
  res.redirect("/user/profile");
});
router.get("/logout", isLoggedIn, function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.use("/", notLoggedIn, function (req, res, next) {
  next();
});

router.get("/signup", function (req, res, next) {
  var messages = req.flash("error");
  res.render("user/signup", {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0,
  });
});

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    failureRedirect: "/user/signup",
    failureFlash: true,
  }),
  function (req, res, next) {
    console.log(req.session.oldUrl);
    if (req.session.oldUrl) {
      var oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    } else {
      res.redirect("/user/profile");
    }
  }
);

router.get("/signin", function (req, res, next) {
  var messages = req.flash("error");
  req.session.oldUrl = req.originalUrl;
  console.log(req.session.oldUrl);
  res.render("user/signin", {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0,
  });
});

router.post(
  "/signin",
  passport.authenticate("local.signin", {
    failureRedirect: "/user/signin",
    failureFlash: true,
  }),
  function (req, res, next) {
    console.log(req.session.oldUrl);
    if (req.session.oldUrl) {
      var oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    } else {
      res.redirect("/user/profile");
    }
  }
);

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect("/");
}
function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
