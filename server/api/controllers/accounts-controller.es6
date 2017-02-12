'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
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
      return res.status(200).json(account.toJSON());
    })
    .catch((err) => {
      let message = err ? err.message : 'An unespected error has occurred';
      return res.status(500).json({ message: message });
    });
  }
}

const check = Accounts.check;

export {check};