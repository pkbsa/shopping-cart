var express = require("express");
var router = express.Router();
var Cart = require("../models/cart");

var generatePayload = require("promptpay-qr");
var qrcode = require("qrcode");
var fs = require("fs");

var Product = require("../models/product");
var Order = require('../models/order');

router.get("/product", isAdmin, function (req, res, next) {
    Product.find( {}, function (err, products){
        if (err) {
            return res.write('Error!')
          }
          
          res.render("admin/product",{products: products})
    });
});
router.get("/product/:id", isAdmin, function (req, res, next) {
    Product.find( {pro}, function (err, products){
        if (err) {
            return res.write('Error!')
          }
          
          res.render("admin/product",{products: products})
    });
});

/* admin homepage*/
router.get("/", isAdmin, function (req, res, next) {
    Order.find( {}, null, {sort: {_id: -1}}, function (err, orders){
        if (err) {
            return res.write('Error!')
          }
          //console.log(orders)
          var cart;
          orders.forEach(function(order){
            cart = new Cart(order.cart);
            order.items = cart.generateArray(); 
          })
          res.render("admin/home",{orders: orders, isadmin: 1})
    });
});

router.post("/edit", isAdmin, function (req, res, next) {
  console.log(req.body)
  Order.findOne({ _id: req.body._id }, function(err, order) {
    if (err) {
        return res.status(500).send({ error: "Error updating order status" });
    }
    if (!order) {
        return res.status(404).send({ error: "Order not found" });
    }
    order.status = req.body.status;
    order.save(function(err) {
        if (err) {
            return res.status(500).send({ error: "Error updating order status" });
        }
        res.redirect('/admin');
    });
  });
});
module.exports = router;

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.admin === 1) {
    return next();
  }
  res.redirect("/user/signin");
}