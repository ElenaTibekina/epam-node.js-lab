const express = require('express');
const CatchPokemonsController = require('../controllers/catchPokemonsController');

const router = express.Router();

router
    .route('/')
    .get(CatchPokemonsController.getCaughtPokemons);

router
    .route('/:id')
    .patch(CatchPokemonsController.catchPokemon);

module.exports = router;