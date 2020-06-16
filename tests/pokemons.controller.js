const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const PokemonsService = require('../controllers/pokemonsController');

describe('pokemons service', () => {
    let service;
    let pokemonsServiceStub;
    const pokemons = [
        {
            'name': 'bulbasaur',
            'id': 1,
            'damage': 51,
            'isCaught': true,
            'createdAt': '2020-04-15'
        },
        {
            'name': 'ivysaur',
            'id': 2,
            'damage': 0,
            'isCaught': false,
            'createdAt': '2020-04-15'
        }
    ];

    before(() => {
        service = PokemonsService;
        pokemonsServiceStub = sinon.stub(service, 'getAllPokemons');
    });

    after(() => {
        pokemonsServiceStub.restore();
    });

    it('should get all pokemons', () => {
        pokemonsServiceStub.returns(pokemons);
        let response = service.getAllPokemons();
        expect(response).to.be.eql(pokemons);
    });
});