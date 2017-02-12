'use strict';

const URL = 'http://localhost:10010/rest';

export default class BluebankFactory {
  /*@ngInject*/
  constructor($q, $http) {
    this.$q = $q;
    this.$http = $http;
  }

  transference(data) {

    const deferred = this.$q.defer();

    this.$http.post(`${URL}/transference`, data, {timeout: deferred.promise})
     .then((data) => { 
        deferred.resolve(data);
     }, (err) => {
        deferred.reject(err);
     });
    return deferred.promise;
  }

  account(agency, accountNumber) {

    const deferred = this.$q.defer();

    this.$http.get(`${URL}/account?agency=${agency}&accountNumber=${accountNumber}`, {timeout: deferred.promise})
     .then((data) => { 
        deferred.resolve(data);
     }, (err) => {
        deferred.reject(err);
     });
    return deferred.promise;

  }
}

  