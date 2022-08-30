import {composeWithMongoose} from "graphql-compose-mongoose";

const mongoose = require('mongoose');
const timestamps = require("mongoose-timestamp");

const ProductSchema = new mongoose.Schema({
    title: { type: 'String', required: true },
    description: { type: 'String', required: true },
    price: { type: 'Number', required: true },
//     backgroundImage: {type: 'String', required: true},
//     productImage: {
//         // required: true,
//         data: Buffer,
//         contentType: String
// },
//     backgroundColor: {
//         // required: true,
//         data: Buffer,
//         contentType: String
// },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },

},
    {
        collection: 'product'
    })

ProductSchema.plugin(timestamps);

ProductSchema.index({ createdAt: 1, updatedAt: 1 });

export const Product = mongoose.model('Product', ProductSchema);
export const ProductTC = composeWithMongoose(Product);
