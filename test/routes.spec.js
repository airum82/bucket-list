const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const config = require('../knexfile')['test'];
const dataBase = require('knex')(config);

chai.use(chaiHttp);

describe('Client Routes', () => {

  beforeEach(done => {
    dataBase.migrate.rollback()
      .then(() => dataBase.migrate.latest())
      .then(() => dataBase.seed.run())
      .then(() => done())
  })

  it('GET /api/v1/bucket-items should return an array of list items', done => {
    chai.request(server)
      .get('/api/v1/bucket-items')
      .end((err, response) => {
        response.should.have.status(200);
        response.body[0].should.have.property('title');
        response.body[0].should.have.property('description');
        done();
      })
  })

  it('POST /api/v1/new-item should return a success message', done => {
    chai.request(server)
      .post('/api/v1/new-item')
      .send({
        title: "next one",
        description: "this is the next item"
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.equal('New item added!')
        done();
      })
  })

  it('POST /api/v1/new-item response should say invalid format if mission information', done => {
    chai.request(server)
      .post('/api/v1/new-item')
      .send({
        description: "umm...where is my title?"
      })
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.equal('Error: invalid format')
        done();
      })
  })

  it('DELETE /api/v1/remove/:title', done => {
    chai.request(server)
      .delete('/api/v1/remove/kendo')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.equal('kendo was successfully deleted');
        done();
      })
  })

  it('DELETE /api/v1/remove/:title', done => {
    chai.request(server)
      .delete('/api/v1/remove/notThere')
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.equal('Error: notthere was not found');
        done();
      })
  })
})