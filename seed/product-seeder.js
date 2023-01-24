var Product = require('../models/product')
var mongoose = require('mongoose');
const { exit } = require('process');

mongoose.connect('mongodb+srv://admin:1234@cluster0.espispq.mongodb.net/?retryWrites=true&w=majority')

var products = [
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
        title: 'Video Game 1',
        description: 'Very Awesome Video Game Part 1',
        price: 10
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
        title: 'Video Game 2',
        description: 'Very Awesome Video Game Part 2',
        price: 10
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
        title: 'Video Game 3',
        description: 'Very Awesome Video Game Part 3',
        price: 10
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
        title: 'Video Game 4',
        description: 'Very Awesome Video Game Part 4',
        price: 10
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
        title: 'Video Game 5',
        description: 'Very Awesome Video Game Part 5',
        price: 10
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
        title: 'Video Game 6',
        description: 'Very Awesome Video Game Part 6',
        price: 10
    }),
];

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
