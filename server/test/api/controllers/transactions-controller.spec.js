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
          "sourceAgency": 4300,
          "sourceAccountNumber": 348086,
          "destinationAgency": 4300,
          "destinationAccountNumber": 348085,
          "value": 1000
        }).expect('Content-Type', /json/).expect(200).end(function (err, res) {
          _should2.default.not.exist(err);

          res.body.should.be.a.Object();

          done();
        });
      });

      it('should transfer amount from user Y to user X', function (done) {

        (0, _supertest2.default)(_app2.default).post('/rest/transference').send({
          "sourceAgency": 4300,
          "sourceAccountNumber": 348085,
          "destinationAgency": 4300,
          "destinationAccountNumber": 348086,
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