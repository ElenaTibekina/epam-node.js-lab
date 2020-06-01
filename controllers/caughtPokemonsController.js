const fs = require('fs');

const pokemons = JSON.parse(fs.readFileSync('./pokemons.json'));

function response(res, code, status, data) {
  res.status(code).json({
    status: status,
    ...data,
  });
}

function responsePokemons(res, pokemons) {
  response(res, 200, 'success', {
    results: pokemons.length,
    data: { pokemons: pokemons },
  });
}

exports.getCaughtPokemons = (req, res) => {
  const caughtPokemons = pokemons.filter((item) => item.isCaught);
  responsePokemons(res, caughtPokemons);
};
