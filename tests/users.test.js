let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const server = require('../src/index.js');

chai.use(chaiHttp);

describe('User endpoints tests: ', () => {
    
    it('Should create a user', (done) => {
        chai.request(server)
            .post('/api/user/register')
            .send({
                username: "test",
                email: `test@test.com`,
                password: "P4ssword",
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                done();
            });
    });
    it('Should login a user', (done) => {
        chai.request(server)
            .post('/api/user/login')
            .send({
                username: "test",
                password: "P4ssword"
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
    it('Should not create a user because email is duplicated', (done) => {
        chai.request(server)
            .post('/api/user/register')
            .send({
                username: "asdasdasd",
                email: `test@test.com`,
                password: "P4ssword"
            })
            .end((err, res) => {
                expect(res).to.have.status(409);
                done();
            });
    });
    it('Should not create a user because firstName doesnt match or is missing', (done) => {
        chai.request(server)
            .post('/api/user/register')
            .send({
                email: `test@test.com`,
                password: "P4ssword"
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    it('Should not create a user because email doesnt match or is missing', (done) => {
        chai.request(server)
            .post('/api/user/register')
            .send({
                username: "Firstname",
                password: "P4ssword"
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    it('Should not login user because the username does not exist', (done) => {
        chai.request(server)
            .post('/api/user/login')
            .send({
                username: "tesssssst",
                password: "P4ssword"
            })
            .end((err, res) => {
                expect(res).to.have.status(409);
                done();
            });
    });
    
});