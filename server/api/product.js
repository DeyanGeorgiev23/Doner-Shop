const Product = require('mongoose').model('Product');

const allowedToppings = [
    'pickle', 
    'tomato', 
    'onion', 
    'lettuce',
    'hot sauce', 
    'extra sauce'
];

const categoryLabels = {
    'chicken': 'Chiken doner',
    'beef': 'Beef doner',
    'lamb': 'Lamb doner'
};

function getName(category, size) {
    return `${categoryLabels[category]}, ${size}cm`;
}

async function create(data) {
    const {
        category,
        size,
        imageUrl,
        price
    } = data;

    const productName = getName(category, size);

    const toppings = data.toppings
        .split(',')
        .map(e => e.trim())
        .filter(e => e.length > 0 && allowedToppings.includes(e));

    return await Product.create({
        category,
        size: Number(size),
        imageUrl,
        toppings,
        price,
        productName
    });
}

async function getAll() {
    const prodcuts = await Product.find({}); 
    const chicken = prodcuts.filter(p => p.category === 'chicken');
    const beef = prodcuts.filter(p => p.category === 'beef');
    const lamb = prodcuts.filter(p => p.category === 'lamb');
    return {
        chicken,
        beef,
        lamb
    };
};

async function getById(id) {
    const product =  await Product.findById(id);
    if (!product) {
        throw new Error(`Product not found: ${id}`);
    }

    product.productName = getName(product.category, product.size);
    return product;
};

module.exports = {
    create,
    getAll,
    getById,
    getName
};