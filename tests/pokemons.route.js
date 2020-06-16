const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

describe('Read (getting all)', () => {
    it('Should get all pokemons', () => {
        chai
            .request('http://localhost:8000')
            .get('/api/v1/pokemons')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
            });
    });
});