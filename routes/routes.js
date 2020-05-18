const express = require('express');
const pokemonsController = require('../controllers/pokemonsController')

const router = express.Router()

router
    .route('/')
    .get(pokemonsController.getAllPokemons)
    .post(pokemonsController.createNewPokemon)

router
    .route('/caught')
    .get(pokemonsController.getCaughtPokemons)

router
    .route('/:id')
    .get(pokemonsController.getPokemonById)
    .post(pokemonsController.updatePokemon)
    .put(pokemonsController.catchPokemon)
    .delete(pokemonsController.deletePokemon)

module.exports = router;
