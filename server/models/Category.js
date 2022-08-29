const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: 'String',
        enum: ['shampoo', 'soap'],
        require: true
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
    }
})


module.exports = mongoose.model('Category', CategorySchema);