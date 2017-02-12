'use strict';

export default class AccountController {
  /*@ngInject*/
	constructor(BluebankFactory, $mdToast) {

    this.BluebankFactory = BluebankFactory;
    this.$mdToast = $mdToast;

    this.agency = null;
    this.accountNumber = null;
    this.cpf = null;
    this.show = false;
    
  }

  account() {  

    let check = false; 

    if (typeof this.agency !== 'undefined' 
      && typeof this.accountNumber !== 'undefined' 
      && typeof this.otherAgency !== 'undefined' 
      && typeof this.otherAccountNumber !== 'undefined') {
      let account = this.agency+''+this.accountNumber;
      let otherAccount = this.otherAgency+''+this.otherAccountNumber;

      if (account === otherAccount) {
        this.agency = null;
        this.accountNumber = null;
        check = true;
        this.$mdToast.showSimple('You are trying using same account to transference. Checking accounts, please!');
      }
    } 

    if (this.agency && this.accountNumber && check === false) {
        this.BluebankFactory
          .account(this.agency, this.accountNumber)
          .then((response) => {
            this.cpf = response.data.cpf;
            this.show = true;         
          })
          .catch((err) => {
            this.show = false;
            this.cpf = null;
            this.$mdToast.showSimple(err.data);
          });
      
    }
  }
}


