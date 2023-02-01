var Product = require('../models/product')
var mongoose = require('mongoose');

const { mongodb_url } = require('./config/config');
mongoose.connect(mongodb_url)

var products = [
    new Product({
        imagePath: ['/products/product1.jpg'],
        title: 'พวงกุญแจ กล้วย',
        description: 'พวงกุญแจ น้องกล้วย ลายหน้าใหญ่ผลิตออกมาแค่จำนวนจำกัด',
        price: 79,
        status: "Available"
    }),
    new Product({
        imagePath: ['/products/product2.jpg'],
        title: 'พวงกุญแจ การ์ตูน',
        description: 'พวงกุญแจ น้องกล้วย ลายการ์ตูนผลิตออกมาแค่จำนวนจำกัด',
        price: 69,
        status: "Available",
    }),
]

var done = 0;
for(var i=0; i<products.length;i++){
    products[i].save(function(err, result){
        done++;
        if (done == products.length){
            exitsave();
        }
    });
}

function exitsave(){
    mongoose.disconnect();
}
