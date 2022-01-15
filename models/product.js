//Requiring mongoose first 
const mongoose = require('mongoose');

//schema 
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
})

//next step is to compile the model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;