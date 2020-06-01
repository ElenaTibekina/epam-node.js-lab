const express = require('express');
const PokemonsController = require('../controllers/pokemonsController');

const router = express.Router();

router
    .route('/')
    .get(PokemonsController.getAllPokemons)
    .post(PokemonsController.createNewPokemon);

router
    .route('/:id')
    .get(PokemonsController.getPokemonById)
    .post(PokemonsController.updatePokemon)
    .delete(PokemonsController.deletePokemon);

module.exports = router;
