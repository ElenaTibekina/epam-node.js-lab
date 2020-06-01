const express = require('express');
const CaughtPokemonsController = require('../controllers/caughtPokemonsController');

const router = express.Router();

router
    .route('/')
    .get(CaughtPokemonsController.getCaughtPokemons);

module.exports = router;