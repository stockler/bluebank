'use strict';

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('controllers', function () {

  describe('accounts', function () {

    describe('GET /rest/account', function () {

      it('should return a valid account', function (done) {

        (0, _supertest2.default)(_app2.default).get('/rest/account?agency=4300&accountNumber=348085').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200).end(function (err, res) {
          _should2.default.not.exist(err);

          res.body.should.be.a.Object();

          done();
        });
      });
    });
  });
});