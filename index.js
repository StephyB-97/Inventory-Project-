//NAME: STEPHY BERNADES 
//PROJECT PURPOSE: Inventory of an ice cream shop to see how much inventory was sold and how much is left 
//DATE: January 12, 2022 
//NOTES: It uses Express + Mongoose 

//code to connect Express 
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

//this is what will require the information that is in products.js
const Product = require('./models/product');

//mongoose code to connect mongoose 
mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log('MONGO CONNECTION OPEN!!!')
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!")
        console.log(err)
    })



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


//array of the categories. this is created to smartly show the selected category of 
//each product that is being edited. 
const categories = ['fruit', 'vegetable', 'dairy'];


//this will present all the products  in node when the /products is open 
app.get('/products', async(req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render("products/index", { products, category });
    } else {
        const products = await Product.find({});
        res.render("products/index", { products, category: 'all' });
    }
})

//New route to submit a new form 
//.get is used to watch it 
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

//sets up the routes for where the submits post act 
//.post is used to change it 
app.post('/products', async(req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})


//This will display the products by Id
app.get('/products/:id', async(req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/show', { product }) //this will show it in the webpage part 
})


//New route to update existing products in the database
app.get('/products/:id/edit', async(req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id); //needs to find the id of the product that is going to be modified 
    res.render('products/edit', { product, categories })
})

//new route to submit the updated information 
app.put('/products/:id', async(req, res) => {
    const { id } = req.params;
    //this will request the data by id and update it
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${product._id}`)
})

//route to delete an existing product in the list 
app.delete('/products/:id', async(req, res) => {
    const { id } = req.params; //code to get all the information using the id
    constdeletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

//this will connect to the 3000 port 
app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000")
})