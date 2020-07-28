const sinon = require('sinon');
const chai = require('chai');
const expect = require('chai').expect;
const should = require('chai').should;
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const City = require('../../models/City');
const server = require('../../server');

chai.use(chaiHttp);

describe('Weather Forecast Cities API', function () {

    describe.skip('Integration tests', function () {

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
            it('should be invalid of name is empty', function (done) {
                const c = new City();

                c.validate(function (err) {
                    expect(err.errors.name).to.exist;
                    done();
                })
            });
            it('should be invalid of country is empty', function (done) {
                const c = new City();

                c.validate(function (err) {
                    expect(err.errors.country).to.exist;
                    done();
                })
            });
            it('should be invalid of coord.lon is empty', function (done) {
                const c = new City();

                c.validate(function (err) {
                    expect(err.errors['coord.lon']).to.exist;
                    done();
                })
            });
            it('should be invalid of coord.lat is empty', function (done) {
                const c = new City();

                c.validate(function (err) {
                    expect(err.errors['coord.lat']).to.exist;
                    done();
                })
            });
            it.skip('should return total number of cities', function (done) {
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