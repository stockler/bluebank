'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
import util from 'util';
import AccountModel from '../models/account';

class Accounts {
  static check(req, res) {    
    let agency = parseInt(req.swagger.params.agency.value);
    let accountNumber = parseInt(req.swagger.params.accountNumber.value);

    AccountModel.findOne({
      agency: agency,
      accountNumber: accountNumber
    })
    .then((account) => {
      console.log(account.toJSON());
      return res.status(200).json(account.toJSON());
    })
    .catch((err) => {
      let message = err ? err.message : 'An unespected error has occurred';
      return res.status(500).json({ message: message });
    })

      
  }
}

const check = Accounts.check;

export {check};