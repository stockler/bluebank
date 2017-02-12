import AccountDirective from './account.directive';

angular
  .module('account.widget', ['api.bluebank'])
  .directive('account', (BluebankFactory, $mdToast) => new AccountDirective(BluebankFactory, $mdToast));