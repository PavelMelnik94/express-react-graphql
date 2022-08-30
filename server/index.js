// const express = require('express');
// const colors = require('colors');
// require('dotenv').config();
// const { graphqlHTTP } = require('express-graphql');
// const schema = require('./schema/scheme');
// const schemaTwo = require('./schema/CaterogyScheme')
// const connectDB = require('./config/db');
// const port = process.env.PORT || 5000;
//
//
//
// const app = express();
//
// // Connect to database
// connectDB().then(() => { });
//
// app.use(
//     '/graphql',
//     graphqlHTTP({
//         schema,
//         graphiql: process.env.NODE_ENV === 'development'
//     }))
//
// app.use(
//     '/graphql',
//     graphqlHTTP({
//         schemaTwo,
//         graphiql: process.env.NODE_ENV === 'development'
//     }))
//
// app.listen(port, () => {
//     console.log(`>>>>> listening server on port ${port}`.bgGreen.underline.bold);
// });
import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import mongoose from 'mongoose';

import './utils/db';
import schema from './schema/index';

dotenv.config();

const app = express();

const server = new ApolloServer({
    schema,
    cors: true,
    playground: process.env.NODE_ENV === 'development',
    introspection: true,
    tracing: true,
    path: '/',
});

server.applyMiddleware({
    app,
    path: '/',
    cors: true,
    onHealthCheck: () =>
        // eslint-disable-next-line no-undef
        new Promise((resolve, reject) => {
            if (mongoose.connection.readyState > 0) {
                resolve();
            } else {
                reject();
            }
        }),
});

// (async function () {
//     await server.start()
// })()

app.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server listening on port ${process.env.PORT}`);
    // console.log(`😷 Health checks available at ${process.env.HEALTH_ENDPOINT}`);
});
