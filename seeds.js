//mongoose code to connect mongoose 
const mongoose = require('mongoose');
const Product = require('./models/product')
mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log('MONGO CONNECTION OPEN!!!')
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!")
        console.log(err)
    })

//One way to insert one product to the database.
//const p = new Product({
//name: 'Ruby Grapefruit',
//price: 1.99,
//category: 'fruit'
//})
//p.save().then(p => {
//console.log(p)
//})
//.catch(e => {
//console.log(e)
//})

//Array of products to insert using the InsertMany option.
const seedProducts = [{
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    }, {
        name: 'Organic Goddes Melon',
        price: 4.99,
        category: 'fruit'
    }, {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    }, {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    },
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })