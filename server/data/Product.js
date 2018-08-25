const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: { type: String, enum: ['chicken', 'beef', 'lamb'] ,required: true },
    size: { type: Number, min: 17, max: 24, required: true },
    imageUrl: { type: String, required: true },
    toppings: { type: [String], default: [] },
    price: { type: mongoose.SchemaTypes.String, default: 0 }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;