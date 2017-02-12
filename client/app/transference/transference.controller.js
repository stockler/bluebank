'use strict';

export default class TransferenceController {
	/*@ngInject*/
	constructor(BluebankFactory, $mdToast, $state) {

    this.BluebankFactory = BluebankFactory;
    this.$mdToast = $mdToast;
    this.$state = $state;

    this.sourceAgency = null;
    this.sourceAccountNumber = null;
    this.destinationAgency = null;
    this.destinationAccountNumber = null;
    this.value = null;
    this.form = null;
  }

  setForm(form) {
    this.form = form;
  }

  registerFormScope(selfForm, id) {
    this.form['childForm'+id] = selfForm;
  }

  reset() {
  	this.sourceAgency = null;
    this.sourceAccountNumber = null;
    this.destinationAgency = null;
    this.destinationAccountNumber = null;
    this.value = null;
    this.form.$setPristine();
  }

  transference(isValid) {
    
  	let data = {
  		sourceAgency: this.sourceAgency,
  		sourceAccountNumber: this.sourceAccountNumber,
  		destinationAgency: this.destinationAgency,
  		destinationAccountNumber: this.destinationAccountNumber,
  		value: this.value
  	}

  	if (isValid) {
	  	this.BluebankFactory
        .transference(data)
        .then((response) => {
  	  		this.$mdToast.showSimple(response.data.message);
  	  		this.$state.reload(); 	  		
  	  	})
  	  	.catch((err) => {
  	  		this.$mdToast.showSimple(err.data);
  	  		this.$state.reload();
  	  	});
  	}
  }
}


