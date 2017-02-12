

describe('Bluebank', function() {
  it('should send value to server', function() {
    browser.get('http://localhost:8080');

    element(by.model('vm.sourceAgency')).sendKeys('4300');
    element(by.model('vm.sourceAccountNumber')).sendKeys('348085');
    element(by.model('vm.destinationAgency')).sendKeys('4300');
    element(by.model('vm.destinationAccountNumber')).sendKeys('348086');
    element(by.model('vm.value')).sendKeys('10');

    // Find the first (and only) button on the page and click it
    element(by.id("transference")).click();

    function eventual(expectedCondition) {
	  return browser.wait(expectedCondition, 2000).then(function() {
	    return true;
	  }, function() {
	    return false;
	  });
	}
    
  });

  
});