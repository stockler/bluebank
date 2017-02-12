'use strict';

import BluebankFactory from './transference/bluebank.factory';
import TransferenceWidget from './transference/transference.module';
import AccountWidget from './account/account.module';

angular.module('api.bluebank', [])
  .factory('BluebankFactory', ($q, $http) => new BluebankFactory($q, $http));

angular.module('bluebank', [
  'ui.router',
  'ngAnimate',
  'ngAria',
  'ngMaterial',
  'ngSanitize',
  'ngMessages',
  'account.widget',
  'transference.widget'  
])
.config(function($urlRouterProvider, $locationProvider, $mdThemingProvider) {
  'ngInject';

  $urlRouterProvider.otherwise("/");
  $locationProvider.html5Mode(true);

  $mdThemingProvider.theme('default')
    .primaryPalette('grey')
    .accentPalette('blue-grey');
});


