'use strict';

import should from 'should';
import request from 'supertest';
import server from '../../../app';

describe('controllers', () => {

  describe('accounts', () => {

    describe('GET /rest/account', () => {

      it('should return a valid account', (done) => {

        request(server)
          .get('/rest/account')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exist(err);

            res.body.should.be.a.Object();

            done();
          });
      });

    });

  });

});
