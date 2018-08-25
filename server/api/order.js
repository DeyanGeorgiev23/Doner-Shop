const Order = require('mongoose').model('Order');
const productApi = require('./product');

async function create(data) {
    const creator = data.creator;
    const product = data.product_id;
    const topping = [];

    for (let key in data) {
        if (!data.hasOwnProperty(key)) { continue; }

        if (key !== 'creator' && key !== 'product_id') {
            topping.push(key);
        }
    }
   
    const order =  await Order.create({
        creator, 
        product,
        topping
    });

    return order;
}

async function getUserId(userId) {
    const orders = await Order.find({ creator: userId }).populate('product');

    let totalPrice = 0;

    orders.map(o => {
        o.productName = productApi.getName(o.product.category, o.product.size);
        o.price = o.product.price; 
        totalPrice += Number(o.price);
    });

    return { orders, totalPrice };
}

async function getById(id) {
    const order =  await Order.findById(id).populate('product');
    order.productName = productApi.getName(order.product.category, order.product.size);
    order.price = order.product.price;

    switch (order.status) {
    case 'Pending':
        order.pending = true;
        break;
    case 'In Progress':
        order.progress = true;
        break;
    case 'In Transit':
        order.transit = true;
        break;
    case 'Delivered':
        order.delivered = true;
        break;
    }
    return order;
}

module.exports = {
    create,
    getUserId,
    getById
};