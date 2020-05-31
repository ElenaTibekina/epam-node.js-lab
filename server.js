const fs = require('fs');
const app = require('./app');

const mongoose = require('mongoose');
const Pokemon = require('./schemas/pokemon');
const User = require('./schemas/user');
const DB = mongoose.connection;
const DB_URL = 'mongodb://localhost:27017/pokedex';
const port = 3000;

const pokemons = JSON.parse(
    fs.readFileSync('./pokemons.json')
);

const users = JSON.parse(
    fs.readFileSync('./users.json')
);

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
app.listen(port, () => {
    console.log(`App is running on port ${port}...`);
});

DB.once('open', () => {
    console.log('DB connected');
    Pokemon.find({}, (err, pokemons) => {
        if (!pokemons.length) {
            loadPokemons();
        }
    });

    User.find({}, (err, users) => {
        if (!users.length) {
            loadUsers();
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

function loadUsers() {
    User.insertMany(users, (err) => {
        if (err) {
            console.log('Request failed');
        }
        console.log('User is saved');
    });
}

