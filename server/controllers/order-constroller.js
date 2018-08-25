const productApi = require('../api/product');
const orderApi = require('../api/order'); 

module.exports = {
    placeGet: async (req, res) => {
        let id = req.params.id;

        try {
            const  product= await productApi.getById(id);
            
            res.render('order/place', product);
        } catch (err) {
            return console.log(err);
        }
    },
    placePost: async (req, res) => { 
        const data = req.body;
        data.creator = req.user._id;

        try {
            await orderApi.create(data);

            res.locals.success = "Your order was added successfully! Check your cart!";
            return res.redirect('/');
        } catch (err) {
            console.log(err);

            return res.render('order/place', {error: err.message });
        }
    },
    status: async (req, res) => {
        try {
            const { orders, totalPrice } = await orderApi.getUserId(req.user._id);

            let counter = orders.length;

            res.render('order/status', { orders, totalPrice, counter });
        } catch (err) {
            return console.log(err);
        }
    },
    details: async (req, res) => {
        try {
            const order = await orderApi.getById(req.params.id);

            const orders = await orderApi.getUserId(req.user._id);
            let counter = orders.orders.length;

            res.render('order/details', { order, counter });
        } catch (err) {
            return console.log(err);
        }
    }
};