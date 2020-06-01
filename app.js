const express = require('express');
const morgan = require('morgan');
const router = require('./routes/routes');

const app = express();

// MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
    console.log('hello from the middleware');
    next();
});

// ROUTE
app.use('/', router);

// START SERVER
module.exports= app;
