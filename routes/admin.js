var express = require("express");
var router = express.Router();
var Cart = require("../models/cart");

var generatePayload = require("promptpay-qr");
var qrcode = require("qrcode");
var fs = require("fs");

var Product = require("../models/product");
var Order = require('../models/order');

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

router.get("/orders", isAdmin, function (req, res, next) {
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
        res.render("admin/orders",{orders: orders, isadmin: 1})
  });
});

router.get("/products", isAdmin, function (req, res, next) {
    Product.find( {}, function (err, products){
        if (err) {
            return res.write('Error!')
          }
        res.render("admin/products",{products: products, isadmin: 1})
    });
});

router.post("/order-edit", isAdmin, function (req, res, next) {
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

router.post("/product-edit", isAdmin, function (req, res, next) {
  console.log(req.body)
  Product.findOne({ _id: req.body._id }, function(err, product) {
    if (err) {
        return res.status(500).send({ error: "Error updating product status" });
    }
    if (!product) {
        return res.status(404).send({ error: "Order not found" });
    }

    product.title = req.body.title;
    product.description = req.body.description;
    product.price = req.body.price;
    product.status = req.body.status;

    product.save(function(err) {
        if (err) {
            return res.status(500).send({ error: "Error updating product status" });
        }
        res.redirect('/admin/products');
    });
  });
});

router.get("/delete-order/:id", function(req, res) {
  var productId = req.params.id;
  Order.deleteOne({ _id: productId }, function(err) {
      if (err) {
          return res.status(500).send({ error: "Error deleting order" });
      }
      res.redirect('/admin/orders');
  });
});

router.get("/delete-product/:id", function(req, res) {
  var productId = req.params.id;
  Product.deleteOne({ _id: productId }, function(err) {
      if (err) {
          return res.status(500).send({ error: "Error deleting product" });
      }
      res.redirect('/admin/products');
  });
});

module.exports = router;

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.admin === 1) {
    return next();
  }
  res.redirect("/user/signin");
}