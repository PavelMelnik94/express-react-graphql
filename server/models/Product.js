const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: { type: 'String', required: true },
    description: { type: 'String', required: true },
    price: { type: 'Number', required: true },
    backgroundImage: {type: 'String', required: true},
    productImage: {
        required: true,
        data: Buffer,
        contentType: String
},
    backgroundColor: {
        required: true,
        data: Buffer,
        contentType: String
},
    category: {
        require: true,
        type: 'String',
        enum: ['shampoo', 'soap'],
        ref: 'Product',
    }
})


module.exports = mongoose.model('Product', ProductSchema);