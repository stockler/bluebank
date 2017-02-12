'use strict';

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('controllers', function () {

  describe('transactions', function () {

    describe('POST /rest/transference', function () {

      it('should transfer amount from user X to user Y', function (done) {

        (0, _supertest2.default)(_app2.default).post('/rest/transference').send({
          "sourceAgency": 3505,
          "sourceAccountNumber": 45322,
          "destinationAgency": 2143,
          "destinationAccountNumber": 9831,
          "value": 100
        }).expect('Content-Type', /json/).expect(200).end(function (err, res) {
          _should2.default.not.exist(err);

          res.body.should.be.a.Object();

          done();
        });
      });

      it('should transfer amount from user Y to user X', function (done) {

        (0, _supertest2.default)(_app2.default).post('/rest/transference').send({
          "sourceAgency": 2143,
          "sourceAccountNumber": 9831,
          "destinationAgency": 3505,
          "destinationAccountNumber": 45322,
          "value": 1000
        }).expect('Content-Type', /json/).expect(200).end(function (err, res) {
          _should2.default.not.exist(err);

          res.body.should.be.a.Object();

          done();
        });
      });
    });
  });
});