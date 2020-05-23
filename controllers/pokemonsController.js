const fs = require('fs');
const Pokemon = require('../schemas/pokemon')

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
    response(res, 500, 'bad request', { message: errorMessage })
}

function responseBad (res, errorMessage) {
    response(res, 404, 'failed', { message: errorMessage })
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
    let query;
    if(name) {
        query = Pokemon.find({ name });
    } else {
        query = Pokemon.find({});
    }
    query.exec((err, pokemons) => {
        if (err) {
            responseFail(res, 'Bad request');
            // res.status(500).json({
            //     status: 'Bad request',
            //     message: err
            // })
        }
        responsePokemons(res, pokemons);
        // res.status(200).json({
        //     status: 'success',
        //     results: pokemons.length,
        //     data: {
        //         pokemons
        //     }
        // })
    })

    // const pokemon = pokemons.filter(el => el.name === name);
    // if (name !== undefined) {
    //     responsePokemon(res, pokemon)
    // } else {
    //     responsePokemons(res, pokemons)
    // }
}

// todo: delete getCaught

// exports.getCaughtPokemons = (req, res) => {
//     const caughtPokemons = pokemons.filter(item => item.isCaught)
//     responsePokemons(res, caughtPokemons)
// };

exports.getPokemonById = (req, res) => {
    const id = req.params.id;
    const query = Pokemon.findById(id);
    query.exec((err, pokemon) => {
        if (err) {
            responseFail(res, 'Bad request');
        } else if (!pokemon) {
            responseBad(res, 'invalid ID')
            // return res.status(404).json({
            //     status: 'fail',
            //     message: 'Invalid ID'
            // })
        } responsePokemon(res, pokemon);
    })
    // const id = parseInt(req.params.id);
    // const pokemon = pokemons.find(el => el.id === id);
    // if (!pokemon) {
    //     responseFail(res, 'Invalid ID')
    //     return
    // }
    // responsePokemon(res, pokemon)
};

exports.createNewPokemon = (req, res) => {
    const newPokemon = {
        name: '',
        damage: '',
        isCaught: '',
        createdAt: '',
        id: null,
        ...req.body
    };
    Pokemon.create(newPokemon, (err, pokemon) => {
        if (err) {
            responseFail(res, 'Bad request');
        } res.status(201).json({
            status: 'success',
            data: {
                pokemon
            }
        })
    })
};

exports.updatePokemon = (req, res) => {
    const id = req.params.id;
    const newPokemon = {
        ...req.body
    };
    const query = Pokemon.findByIdAndUpdate(id, newPokemon, {new: true});
    query.exec((err, pokemon) => {
        if (err) {
            return responseFail(res, 'Bad request');
        } else if (!pokemon) {
            return responseBad(res, 'invalid ID')
        }
        responsePokemon(res, pokemon);
    })

    // const id = parseInt(req.params.id);
    // const pokemon = pokemons.find(el => el.id === id);
    // if (parseInt(req.params.id) > pokemons.length) {
    //     responseFail(res, 'Invalid ID')
    //     return
    // }
    // const newPokemon = Object.assign(pokemon, req.body);
    // writePokemons(err => {
    //     responsePokemon(res, newPokemon)
    // })
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
   const id = req.params.id;
   const query = Pokemon.findByIdAndDelete(id);
   query.exec((err, pokemon) => {
       if (err) {
           return res.status(500).json({
               status: 'Request failed',
               message: err
           })
       } if (!pokemon) {
           return res.status(404).json({
               status: 'fail',
               message: 'invalid id'
           })
       }
       res.status(204).json({
           status: 'success',
           data: null
       })
   })
    // if (parseInt(req.params.id) > pokemons.length) {
    //     responseFail(res, 'Invalid ID')
    //     return
    // }
    // responsePokemon(res, null)
};
