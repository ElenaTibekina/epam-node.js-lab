const Pokemon = require('../schemas/pokemon');

function response(res, code, status, data) {
  res.status(code).json({
    status: status,
    ...data,
  });
}

function responseFail(res, errorMessage) {
  response(res, 500, 'bad request', { message: errorMessage });
}

function responseBad(res, errorMessage) {
  response(res, 404, 'failed', { message: errorMessage });
}

function responsePokemon(res, pokemon) {
  response(res, 200, 'success', { data: { pokemon: pokemon } });
}

function responsePokemons(res, pokemons) {
  response(res, 200, 'success', {
    results: pokemons.length,
    data: { pokemons: pokemons },
  });
}

function responsePokemonCreated(res, pokemon) {
  response(res, 201, 'success', { data: { pokemon: pokemon } });
}

function responsePokemonDeleted(res, pokemon) {
  response(res, 204, 'success', { data: { pokemon: pokemon } });
}

exports.getAllPokemons = (req, res) => {
  const name = req.query.name;
  let query;
  if (name) {
    query = Pokemon.find({ name });
  } else {
    query = Pokemon.find({});
  }
  query.exec((err, pokemons) => {
    if (err) {
      responseFail(res, 'Bad request');
    }
    responsePokemons(res, pokemons);
  });
};

exports.getPokemonById = (req, res) => {
  const id = req.params.id;
  const query = Pokemon.findById(id);
  query.exec((err, pokemon) => {
    if (err) {
      responseFail(res, 'Bad request');
    } else if (!pokemon) {
      responseBad(res, 'invalid ID');
    }
    responsePokemon(res, pokemon);
  });
};

exports.createNewPokemon = (req, res) => {
  const newPokemon = {
    name: '',
    damage: '',
    isCaught: '',
    createdAt: '',
    ...req.body,
  };
  Pokemon.create(newPokemon, (err, pokemon) => {
    if (err) {
      responseFail(res, 'Bad request');
    }
    responsePokemonCreated(res, pokemon);
  });
};

exports.updatePokemon = (req, res) => {
  const id = req.params.id;
  const newPokemon = {
    ...req.body,
  };
  const query = Pokemon.findByIdAndUpdate(id, newPokemon, { new: true });
  query.exec((err, pokemon) => {
    if (err) {
      return responseFail(res, 'Bad request');
    } else if (!pokemon) {
      return responseBad(res, 'invalid ID');
    }
    responsePokemon(res, pokemon);
  });
};

exports.deletePokemon = (req, res) => {
  const id = req.params.id;
  const query = Pokemon.findByIdAndDelete(id);
  query.exec((err, pokemon) => {
    if (err) {
      return responseFail(res, 'bad request');
    }
    if (!pokemon) {
      return responseFail(res, 'invalid id');
    }
    responsePokemonDeleted(res, null);
  });
};
