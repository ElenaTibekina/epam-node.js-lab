const express = require('express');
const morgan = require('morgan');

const pokemonRouter = require('./routes/routes');

const app = express();

// MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
    console.log('hello from the middleware');
    next();
});

// ROUTE
app.use('/api/v1/pokemons', pokemonRouter);

// START SERVER
module.exports= app;





