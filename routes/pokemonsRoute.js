const { Router } = require('express');
const PokemonsController = require('../controllers/pokemonsController');

const router = Router();

router.get('/', (req, res) => {
  PokemonsController.getAllPokemons(req, res);
});

router.get('/:id', (req, res) => {
  PokemonsController.getPokemonById(req, res);
});

router.post('/', (req, res) => {
  PokemonsController.addPokemon(req, res);
});

router.patch('/:id', (req, res) => {
  PokemonsController.updatePokemon(req, res);
});

router.delete('/:id', (req, res) => {
  PokemonsController.deletePokemon(req, res);
});

module.exports = router;

// router.
//     get('/', (req, res) => {
//         PokemonsController.getAllPokemons(req, res);
//     });

// router.
//     post('/', (req, res) => {
//         PokemonsController.createNewPokemon(req, res);
//     });

// router.
//     get('/:id', (req, res) => {
//         PokemonsController.getPokemonById(req, res);
//     });

// router.
//     patch('/:id', (req, res) => {
//         PokemonsController.updatePokemon(req, res);
//     });

// router.
// delete('/:id', (req, res) => {
//     PokemonsController.deletePokemon(req, res);
// });    

// module.exports = router;
        

