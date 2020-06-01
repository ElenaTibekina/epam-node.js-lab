const fs = require('fs');

const pokemons = JSON.parse(fs.readFileSync('./pokemons.json'));

function response(res, code, status, data) {
  res.status(code).json({
    status: status,
    ...data,
  });
}

function responseFail(res, errorMessage) {
  response(res, 500, 'bad request', { message: errorMessage });
}

function responsePokemons(res, pokemons) {
  response(res, 200, 'success', {
    results: pokemons.length,
    data: { pokemons: pokemons },
  });
}

exports.catchPokemon = (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((el) => el.id === id);
  if (parseInt(req.params.id) > pokemons.length) {
    responseFail(res, 'Invalid ID');
    return;
  }
  pokemon.isCaught = true;
};

exports.getCaughtPokemons = (req, res) => {
  const caughtPokemons = pokemons.filter((item) => item.isCaught);
  responsePokemons(res, caughtPokemons);
};
