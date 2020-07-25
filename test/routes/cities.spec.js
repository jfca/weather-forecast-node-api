const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const City = require('../../models/City');
const server = require('../../server');
chai.should();

chai.use(chaiHttp);

describe('Weather Forecast Cities API', function () {

    describe('Integration tests', function () {

        describe('GET /api/cities/count', function () {
            it('should return total number of cities', (done) => {
                chai.request(server)
                    .get('/api/cities/count')
                    .end((err, response) => {
                        response.should.have.status(200);
                        done();
                    })
            });
            //@TODO research how to do error testing on API integration tests
            it.skip('should return 500 on internal error', (done) => {
                chai.request(server)
                    .get('/api/cities/counts')
                    .end((err, res) => {
                        res.should.have.status(500);
                        done();
                    })
            });
        });

    });

    describe('Unit tests', function () {

        describe('GET /api/cities/count', function () {
            it('should return total number of cities', function (done) {
                const countDocuments = sinon.stub(City, 'countDocuments');
                chai.request(server)
                    .get('/api/cities/count')
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.eql(209500);
                        done();
                    });
                countDocuments.restore();
                // sinon.assert.calledOnce(countDocuments);
            });
        });
    });
});