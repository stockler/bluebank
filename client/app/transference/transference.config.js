'use strict';

export default function configTransference($stateProvider) {
    'ngInject';
    
    $stateProvider
    .state('transference', {
      url: '/',
      views: {
        '': {
          templateUrl: '/app/transference/views/transference.html',
          controller: 'TransferenceController',
          controllerAs: 'vm'
        }
      }
    })
    ;
  
}