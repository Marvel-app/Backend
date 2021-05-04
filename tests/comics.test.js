let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const server = require('../src/index.js');
const jwt = ""
const TEST_BEARER = "Bearer " + jwt

chai.use(chaiHttp);

describe('User endpoints tests: ', () => {
    
    it('gets comics that have hulk in them', (done) => {
        chai.request(server)
            .get('/api/comics?heroname=hulk')
            .set("authorization", TEST_BEARER)
            .end((err, res) => {
                expect(res).to.have.status(200);         
                done();
            });
    });
    
});

