const express = require('express');
const pokemonsController = require('./pokemonsRoute');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer');
const User = require('./../schemas/user');
const auth = require('./auth');
const privateKey = require('./../privateKey');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// router.param('id', (req, res, next, val) => {
//   console.log(`Pokemon id is: ${val}`);
//   next();
// });

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

router.use('/pokemons', passport.authenticate('bearer', { session: false }), pokemonsController);

module.exports = router;
