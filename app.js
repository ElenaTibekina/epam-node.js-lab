const express = require('express');
const morgan = require('morgan');

const pokemonsRouter = require('./routes/pokemonsRoute');
const usersRouter = require('./routes/usersRoute');

const app = express();

// MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from the middleware');
  next();
});

// ROUTE
app.use('/api/v1/pokemons', pokemonsRouter);
app.use('/api/v1/users', usersRouter);

// START SERVER
module.exports = app;
