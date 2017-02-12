(function() {

	'use strict'
	angular
	.module('mockedBluebankJSON',[])
	.value('defaultJSON',{
    	fakeDataAccount:{
		    agency: 4300,
		    accountNumber: 348085,
		    cpf: 21859201890		    
		},
		fakeDataTransfered: {
		    message: 'You transfered the amount of R$ 10 Reais'		    
		}		
	});

})();