var mongoose = require("mongoose");
var order = require('../app/models/order');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

let id;

describe('/GET orders', () => {
  it('it should GET all orders', (done) => {
    chai.request(server)
        .get('/orders')
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.should.not.be.empty;
          done();
        });
  });
});

/* Once required functionality is imiplemented,
** create corresponding tests
*/

/***** test POST /order/ *****/

describe('/POST order', () => {
  it('it should POST an order', (done) => {
    chai.request(server)
        .post('/orders')
        .set('content-type', 'application/json')
        .send({
          customer: "testtttttttttttttttttttttttt",
          date: "2018-07-29T00:17:12.000Z",
          isDelivered: true,
          value: 668,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.not.be.empty;
          id = res.body._id;
          done();
        });
  });
});


/***** test GET /order/:id *****/

describe('/GET orders by id', () => {
  it('it should GET an order by id', (done) => {
    chai.request(server)
        .get('/orders/' + id)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.not.be.empty;
          done();
        });
  });
});

/***** test DELETE /order/:id *****/

describe('/DELETE orders by id', () => {
  it('it should DELETE an order by id', (done) => {
    chai.request(server)
        .delete('/orders/' + id)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.not.be.empty;
          done();
        });
  });
});
