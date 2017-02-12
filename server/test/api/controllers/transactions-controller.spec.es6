'use strict';

import should from 'should';
import request from 'supertest';
import server from '../../../app';

describe('controllers', () => {

  describe('transactions', () => {

    describe('POST /rest/transference', () => {

      it('should transfer amount from user X to user Y', (done) => {

        request(server)
          .post('/rest/transference')          
          .send({ 
            "sourceAgency": 3505,
            "sourceAccountNumber": 45322,
            "destinationAgency": 2143,
            "destinationAccountNumber": 9831,
            "value": 100
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exist(err);

            res.body.should.be.a.Object();

            done();
          });
      });

      it('should transfer amount from user Y to user X', (done) => {

        request(server)
          .post('/rest/transference')          
          .send({ 
            "sourceAgency": 2143,
            "sourceAccountNumber": 9831,
            "destinationAgency": 3505,
            "destinationAccountNumber": 45322,
            "value": 1000
          })
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
