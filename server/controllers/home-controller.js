const productApi = require('../api/product');
const Order = require('mongoose').model('Order');

module.exports = {
    index: async (req, res) => {
        const order = await Order.find({ creator: req.user });

        let counter = order.length;

        res.render('home/index', { counter });
    },
    about: async (req, res) => {
        const products = await productApi.getAll();
        
        const order = await Order.find({ creator: req.user });

        let counter = order.length;

        res.render('home/about', { products, counter, admin: (req.user && req.user.roles === 'Admin') });
    }
};
