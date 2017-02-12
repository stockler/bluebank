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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.check = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _account = require('../models/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Accounts = function () {
  function Accounts() {
    _classCallCheck(this, Accounts);
  }

  _createClass(Accounts, null, [{
    key: 'check',
    value: function check(req, res) {
      var agency = parseInt(req.swagger.params.agency.value);
      var accountNumber = parseInt(req.swagger.params.accountNumber.value);

      _account2.default.findOne({
        agency: agency,
        accountNumber: accountNumber
      }).then(function (account) {
        return res.status(200).json(account.toJSON());
      }).catch(function (err) {
        var message = err ? err.message : 'An unespected error has occurred';
        return res.status(500).json({ message: message });
      });
    }
  }]);

  return Accounts;
}();

var check = Accounts.check;

exports.check = check;