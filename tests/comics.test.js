let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const server = require('../src/index.js');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDkxZmIwZmE5ZDFkMzAwMTUwMmIyNDMiLCJ1c2VybmFtZSI6InRlc3RFbnJpcXVlIiwiZW1haWwiOiJ0ZXN0ZXJpcXVlQHRlc3QuY29tIiwiaWF0IjoxNjIwNjgwOTQ4LCJleHAiOjE2MjA2ODQ1NDh9.-8ymLrgcRfU3mjQYaJqNGfz_Sb8VQp4NtI7WguIGDMc'//get a token first
chai.use(chaiHttp);

describe('Comics endpoints tests: ', () => {

    it('gets comics', (done) => {
        chai.request(server)
            .get('/api/comics?heroname=hulk&numberComics=2')
            .set({ "Authorization": `Bearer ${token}` })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
    it('gets comics', (done) => {
        chai.request(server)
            .get('/api/comics/randoms?numberComics=2')
            .set({ "Authorization": `Bearer ${token}` })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});