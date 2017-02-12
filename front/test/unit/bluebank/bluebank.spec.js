import BluebankFactory from '../../../app/transference/bluebank.factory';

describe('Bluebank factory', function() {
	let BluebankFactory;
  let $httpBackend;
  let mockedBluebankJSON;

  beforeEach(angular.mock.module('api.bluebank', 'mockedBluebankJSON'));

  beforeEach(inject(function(_BluebankFactory_, _$httpBackend_, defaultJSON) {
  	BluebankFactory = _BluebankFactory_;

    $httpBackend = _$httpBackend_;

    $httpBackend.when('GET', 'http://localhost:10010/rest/account?agency=4300&accountNumber=348085').respond(defaultJSON.fakeDataAccount);
    $httpBackend.when('POST', 'http://localhost:10010/rest/transference').respond(defaultJSON.fakeDataTransfered);
  }));

  it('should exist', function() {
  	expect(BluebankFactory).toBeDefined();
  });

  describe('.account()', function() {

  	it('should exist', function() {
    		expect(BluebankFactory.account).toBeDefined();
  	});

    it('should return a object with CPF', function() {
      
      BluebankFactory.account(4300, 348085).then(function(response) {
        console.log(response.data);
        expect(response.data.cpf).toEqual(21859201890);
      });
      $httpBackend.flush();
      
    });

    
  });

  describe('.transference()', function() {

    it('should exist', function() {
        expect(BluebankFactory.transference).toBeDefined();
    });

    it('should return a message', function() {
      
      BluebankFactory.transference({
        sourceAgency: 4300,
        sourceAccountNumber: 348085,
        destinationAgency: 4300,
        destinationAccountNumber: 348086,
        value: 10       
      }).then(function(response) {
        expect(response.data.message).toEqual('You transfered the amount of R$ 10 Reais');
      });
      $httpBackend.flush();
      
    });

    
  });
});