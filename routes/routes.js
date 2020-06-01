const express = require('express');
const pokemonsRoute= require('./pokemonsRoute');
const catchPokemonsRoute = require('./catchPokemonsRoute');
const caughtPokemonsRoute = require('./caughtPokemonRoute');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer');
const User = require('./../schemas/user');
const auth = require('./auth');
const privateKey = require('./../privateKey');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

function verifyJWT(token) {
  let isValid = false;
  if (token) {
    jwt.verify(token, privateKey, (err) => {
      if (err) {
        isValid = false;
      } else {
        isValid = true;
      }
    });
  } else {
    isValid = false;
  }
  return isValid;
}

passport.use(
  new LocalStrategy({ session: false }, (username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      bcrypt.compare(password, user.password).then((res) => {
        if (res) {
          return done(null, { username, password });
        }
        return done(null, false, { message: 'Incorrect password' });
      });
    });
  })
);

passport.use(
  new BearerStrategy((token, done) => {
    const isValid = verifyJWT(token);
    if (!isValid) {
      return done(null, false);
    }
    return done(null, token);
  })
);

router.use('/auth', passport.authenticate('local', { session: false }), auth);
router.use('/pokemons', passport.authenticate('bearer', { session: false }), pokemonsRoute);
router.use('/catch', passport.authenticate('bearer', { session: false }), catchPokemonsRoute);
router.use('/caught', passport.authenticate('bearer', { session: false }), caughtPokemonsRoute);

module.exports = router;
