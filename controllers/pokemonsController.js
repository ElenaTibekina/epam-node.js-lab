const fs = require('fs');

const pokemons = JSON.parse(
    fs.readFileSync(`${__dirname}/../pokemons.json`)
);

function writePokemons (writeCallback) {
    fs.writeFile(`${__dirname}/../pokemons.json`, JSON.stringify(pokemons), writeCallback)
}

function response (res, code, status, data) {
    res.status(code).json({
        status: status,
        ...data
    })
}

function responseFail (res, errorMessage) {
    response(res, 404, 'fail', { message: errorMessage })
}

function responsePokemon(res, pokemon) {
    response(res, 200, 'success', { data: { pokemon: pokemon} })
}

function responsePokemons (res, pokemons) {
    response(res, 200, 'success', {
        results: pokemons.length,
        data: { pokemons: pokemons }
    })
}

exports.getAllPokemons = (req, res) => {
    const name = req.query.name;
    const pokemon = pokemons.filter(el => el.name === name);
    if (name !== undefined) {
        responsePokemon(res, pokemon)
    } else {
        responsePokemons(res, pokemons)
    }
}

exports.getCaughtPokemons = (req, res) => {
    const caughtPokemons = pokemons.filter(item => item.isCaught)
    responsePokemons(res, caughtPokemons)
};

exports.getPokemonById = (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(el => el.id === id);
    if (!pokemon) {
        responseFail(res, 'Invalid ID')
        return
    }
    responsePokemon(res, pokemon)
};

exports.createNewPokemon = (req, res) => {
    const newId = pokemons[pokemons.length - 1].id + 1;
    const newPokemon = Object.assign({id: newId, name: '', damage: '', date: ''}, req.body);
    pokemons.push(newPokemon);
    writePokemons(err => {
        responsePokemon(res,  newPokemon)
    });
};

exports.updatePokemon = (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(el => el.id === id);
    if (parseInt(req.params.id) > pokemons.length) {
        responseFail(res, 'Invalid ID')
        return
    }
    const newPokemon = Object.assign(pokemon, req.body);
    writePokemons(err => {
        responsePokemon(res, newPokemon)
    })
};

exports.catchPokemon = (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(el => el.id === id);
    if (parseInt(req.params.id) > pokemons.length) {
        responseFail(res,  'Invalid ID')
        return
    }
    pokemon.isCaught = true;
    writePokemons(err => {
        responsePokemon(res, pokemon)
    })
};

exports.deletePokemon = (req, res) => {
    if (parseInt(req.params.id) > pokemons.length) {
        responseFail(res, 'Invalid ID')
        return
    }
    responsePokemon(res, null)
};
