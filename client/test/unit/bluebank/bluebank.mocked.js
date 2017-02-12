(function() {


	'use strict'
	angular
	.module('mockedBluebankJSON',[])
	.value('defaultJSON',{
    	fakeDataAccount:{
		    agency: 2143,
		    accountNumber: 9831,
		    cpf: 32198712300		    
		},
		fakeDataTransfered: {
		    message: 'You transfered the amount of R$ 10 Reais'		    
		}		
	});

})();