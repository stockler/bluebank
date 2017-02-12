'use strict';
import AccountController from './account.controller';

export default class AccountDirective {
  /*@ngInject*/
  constructor(BluebankFactory, $mdToast) {
    this.BluebankFactory = BluebankFactory;
    this.$mdToast = $mdToast;
    this.templateUrl = '/app/account/views/account.html';
    this.restrict = 'E';
    this.replace = true;
    this.scope = {
      agency: '=',
      accountNumber: '=',
      otherAgency: '=',
      otherAccountNumber: '=',
      registerFormScope: '='
    };

    this.controller = AccountController;
    this.controllerAs = 'vm';
    this.bindToController = true;
  }
    
  link() {
    $timeout(function () {
      this.form.fields = ['agency', 'accountNumber'];
      this.registerFormScope(this.form, this.$id);
    });
    
  }
}