const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    creator: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' },
    product: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Product' },
    dateCreated: { type: mongoose.SchemaTypes.Date, default: Date.now },
    topping: { type: [ mongoose.SchemaTypes.String ] },
    status: { type: mongoose.SchemaTypes.String, enum: ['Pending', 'In Progress', 'In Transit', 'Delivered'], default: 'Pending' },
    price: { type: mongoose.SchemaTypes.String, default: 0 }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;