const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

const pokemons = JSON.parse(
    fs.readFileSync(`${__dirname}/pokemons.json`)
);

function writePokemons (writeCallback) {
    fs.writeFile(`${__dirname}/pokemons.json`, JSON.stringify(pokemons), writeCallback)
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

const getAllPokemons = (req, res) => {
    responsePokemons(res, pokemons)
}

const getCaughtPokemons = (req, res) => {
    const caughtPokemons = pokemons.filter(item => item.isCaught)
    responsePokemons(res, caughtPokemons)
};

const getPokemonById = (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(el => el.id === id);
    if (!pokemon) {
        responseFail(res, 'Invalid ID')
        return
    }
    responsePokemon(res, pokemon)
};

const getPokemonByName = (req, res) => {
    const name = req.params.name;
    const pokemon = pokemons.find(el => el.name === name);
    if (!pokemon) {
        responseFail(res, 'Invalid name')
        return
    }
    responsePokemon(res, pokemon)
};

const createNewPokemon = (req, res) => {
    const newId = pokemons[pokemons.length - 1].id + 1;
    const newPokemon = Object.assign({id: newId, name: '', damage: '', date: ''}, req.body);
    pokemons.push(newPokemon);
    writePokemons(err => {
        responsePokemon(res,  newPokemon)
    });
};

const updatePokemon = (req, res) => {
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

const catchPokemon = (req, res) => {
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

const deletePokemon = (req, res) => {
    if (parseInt(req.params.id) > pokemons.length) {
        responseFail(res, 'Invalid ID')
        return
    }
    responsePokemon(res, null)
};

app
    .route('/api/v1/pokemons')
    .get(getAllPokemons)
    .post(createNewPokemon)

app
    .route('/api/v1/pokemons/caught')
    .get(getCaughtPokemons)

app
    .route('/api/v1/pokemons/id/:id')
    .get(getPokemonById)
    .post(updatePokemon)
    .put(catchPokemon)
    .delete(deletePokemon)

app
    .route('/api/v1/pokemons/name/:name')
    .get(getPokemonByName)

const port = 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}...`)
})

