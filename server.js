const fs = require('fs');
const app = require('./app');

const mongoose = require('mongoose');
const Pokemon = require('./schemas/pokemon');
const DB = mongoose.connection;
const DB_URL = 'mongodb://localhost:27017/pokedex';
const port = 3000;

const pokemons = JSON.parse(
    fs.readFileSync('./pokemons.json')
);

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
app.listen(port, () => {
    console.log(`App is running on port ${port}...`);
});

DB.once('open', () => {
    console.log('DB connected');
    Pokemon.find({}, (err, items) => {
        if (!items.length) {
            loadPokemons();
        }
    });
});

function loadPokemons() {
    Pokemon.insertMany(pokemons, (err) => {
        if (err) {
            console.log('Request failed');
        }
        console.log('Initiail pokemons state is saved!');
    });
}

