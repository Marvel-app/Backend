let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const server = require('../src/index.js');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDkxZmIwZmE5ZDFkMzAwMTUwMmIyNDMiLCJ1c2VybmFtZSI6InRlc3RFbnJpcXVlIiwiZW1haWwiOiJ0ZXN0ZXJpcXVlQHRlc3QuY29tIiwiaWF0IjoxNjIwNjgwOTQ4LCJleHAiOjE2MjA2ODQ1NDh9.-8ymLrgcRfU3mjQYaJqNGfz_Sb8VQp4NtI7WguIGDMc' //get a token first
chai.use(chaiHttp);

describe('User endpoints tests: ', () => {
    
    it('Should create a user', (done) => {
        chai.request(server)
            .post('/api/user/register')
            .send({
                username: "nueviqwe11qqqqweto",
                email: `nueviqwe11qqqqweto@test.com`,
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
                username: "supernuevo",
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
                email: `supernuevo@test.com`,
                password: "P4ssword"
            })
            .end((err, res) => {
                expect(res).to.have.status(409);
                done();
            });
    });
    it('Should not create a user because username is missing', (done) => {
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

    it('Should login user', (done) => {
        chai.request(server)
            .post('/api/user/login')
            .send({
                username: "testnuevo",
                password: "P4ssword"
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
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
    it('Should not login user because the username is missing', (done) => {
        chai.request(server)
            .post('/api/user/login')
            .send({
                
                password: "P4ssword"
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });
    it('Should not login user because password is wrong', (done) => {
        chai.request(server)
            .post('/api/user/login')
            .send({
                username: "testnuevo",
                password: "mal"
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });
    it('Should not login user because password is missing', (done) => {
        chai.request(server)
            .post('/api/user/login')
            .send({
                username: "testnuevo",
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });
    
    it('get comics from a user', (done) => {
        chai.request(server)
            .get('/api/user/favorites')
            .set({ "Authorization": `Bearer ${token}` })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('add comic to a user account', (done) => {
        chai.request(server)
            .post('/api/user/favorites')
            .set({ "Authorization": `Bearer ${token}` })
            .send({
            fav:[
                {
                    title: "pruebi11ta21 (2015) #5",
                    description: "IT'S THE SPIDER TEAM-UP OF THE CENTURY TO TAKE DOWN THE BLACK CAT! Silk and Spider-Man, together in one book (no, not together. Calm down.)",
                    image: "",
                    publish: "2015-06-10T00:00:00-0400",
                    coverArtist: "Dave Johnson",
                    penciler: "",
                    writer: "Robbie Thompson"
                }
            ]      
            
        
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
    it('refreshes token', (done) => {
        chai.request(server)
            .get('/api/user/refresh')
            .set({ "Authorization": `Bearer ${token}` })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});