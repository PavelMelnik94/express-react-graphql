import {composeWithMongoose} from "graphql-compose-mongoose";

const mongoose = require('mongoose');
const timestamps = require("mongoose-timestamp");

const CategorySchema = new mongoose.Schema({
    name: {
        type: 'String',
        enum: ['shampoo', 'soap'],
    },
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }
},
    {
        collection: 'category'
    })

CategorySchema.plugin(timestamps);

CategorySchema.index({ createdAt: 1, updatedAt: 1 });

export const Category = mongoose.model('Category', CategorySchema);
export const CategoryTC = composeWithMongoose(Category);
