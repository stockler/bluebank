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
            "sourceAgency": 4300,
            "sourceAccountNumber": 348086,
            "destinationAgency": 4300,
            "destinationAccountNumber": 348085,
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

      it('should transfer amount from user Y to user X', (done) => {

        request(server)
          .post('/rest/transference')          
          .send({ 
            "sourceAgency": 4300,
            "sourceAccountNumber": 348085,
            "destinationAgency": 4300,
            "destinationAccountNumber": 348086,
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
