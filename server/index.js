const express = require('express');
const colors = require('colors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/scheme');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;


const app = express();

// Connect to database
connectDB().then(() => {});

app.use(
    '/graphql',
    graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, () => {
    console.log(`>>>>> listening server on port ${port}`.bgGreen.underline.bold);
});
