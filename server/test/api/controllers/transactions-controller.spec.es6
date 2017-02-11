'use strict';

import should from 'should';
import request from 'supertest';
import server from '../../../app';

describe('controllers', () => {

  describe('transactions', () => {

    describe('POST /rest/transference', () => {

      it('should transfer amount', (done) => {

        request(server)
          .post('/rest/transference')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exist(err);

            res.body.should.be.a.Array();

            done();
          });
      });

    });

  });

});
