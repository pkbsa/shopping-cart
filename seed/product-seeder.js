var Product = require('../models/product')
var mongoose = require('mongoose');
const { exit } = require('process');

mongoose.connect('mongodb+srv://admin:1234@cluster0.espispq.mongodb.net/?retryWrites=true&w=majority')

var products = [
    new Product({
        imagePath: '/products/product1.jpg',
        title: 'พวงกุญแจ กล้วย',
        description: 'Very Awesome Video Game Part 1',
        price: 10
    }),
    new Product({
        imagePath: '/products/product2.jpg',
        title: 'พวงกุญแจ การ์ตูน',
        description: 'Very Awesome Video Game Part 2',
        price: 10
    }),
    new Product({
        imagePath: '/products/product2.jpg',
        title: 'พวงกุญแจ การ์ตูน',
        description: 'Very Awesome Video Game Part 2',
        price: 10
    }),
    new Product({
        imagePath: '/products/product2.jpg',
        title: 'พวงกุญแจ การ์ตูน',
        description: 'Very Awesome Video Game Part 2',
        price: 10
    }),
    new Product({
        imagePath: '/products/product2.jpg',
        title: 'พวงกุญแจ การ์ตูน',
        description: 'Very Awesome Video Game Part 2',
        price: 10
    })
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
