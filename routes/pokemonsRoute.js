const express = require('express');
const pokemonsController = require('../controllers/pokemonsController');

const router = express.Router();

router.param('id', (req, res, next, val) => {
  console.log(`Pokemon id is: ${val}`);
  next();
});

router
  .route('/')
  .get(pokemonsController.getAllPokemons)
  .post(pokemonsController.createNewPokemon);

router
  .route('/:id')
  .get(pokemonsController.getPokemonById)
  .patch(pokemonsController.updatePokemon)
  .delete(pokemonsController.deletePokemon);

module.exports = router;
