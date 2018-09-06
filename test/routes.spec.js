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
        response.body.should.be.a('array');
        response.body[0].id.should.equal(1)
        response.body[0].should.have.property('title');
        response.body[0].should.have.property('description');
        response.body[0].title.should.equal('deep south road trip');
        response.body[0].description.should.equal('Take a road trip through the deep south');
        response.body.length.should.equal(2);
        done();
      })
  })

  it('POST /api/v1/new-item should return a success message', done => {
    chai.request(server)
      .post('/api/v1/bucket-items')
      .send({
        title: "next one",
        description: "this is the next item"
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.deep.equal({ message: 'New item added!', id: [3] })
        done();
      })
  })

  it('POST /api/v1/new-item response should say invalid format if mission information', done => {
    chai.request(server)
      .post('/api/v1/bucket-items')
      .send({
        description: "umm...where is my title?"
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.should.equal('Invalid Format')
        done();
      })
  })

  it('DELETE /api/v1/bucket-items/:id', done => {
    chai.request(server)
      .delete('/api/v1/bucket-items/1')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.equal("item was successfully deleted");
        done();
      })
  })

  it('DELETE /api/v1/bucket-items/:id', done => {
    chai.request(server)
      .delete('/api/v1/bucket-items/3')
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.equal('Error: item was not found');
        done();
      })
  })
})