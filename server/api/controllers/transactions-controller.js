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
exports.transference = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _account = require('../models/account');

var _account2 = _interopRequireDefault(_account);

var _transaction = require('../models/transaction');

var _transaction2 = _interopRequireDefault(_transaction);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TransactionsController = function () {
  function TransactionsController() {
    _classCallCheck(this, TransactionsController);
  }

  _createClass(TransactionsController, null, [{
    key: 'transference',
    value: function transference(req, res) {
      var data = req.swagger.params.body.value;

      var sourceAgency = void 0;
      var sourceAccountNumber = void 0;
      var destinationAgency = void 0;
      var destinationAccountNumber = void 0;
      var value = void 0;

      if (data) {
        sourceAgency = data.sourceAgency;
        sourceAccountNumber = data.sourceAccountNumber;
        destinationAgency = data.destinationAgency;
        destinationAccountNumber = data.destinationAccountNumber;
        value = data.value;

        return _bluebird2.default.try(function () {
          var sourceAccount = _account2.default.findOne({
            agency: sourceAgency,
            accountNumber: sourceAccountNumber
          }).then(function (account) {
            return account;
          });

          var destinationAccount = _account2.default.findOne({
            agency: destinationAgency,
            accountNumber: destinationAccountNumber
          }).then(function (account) {
            return account;
          });

          return [sourceAccount, destinationAccount];
        }).spread(function (sourceAccount, destinationAccount) {

          if (sourceAccount.value - value < 0) {
            throw new Error('You haven\'t sufficient ammount on your account for this operation');
          }

          return _transaction2.default.create({
            source: sourceAccount._id,
            destination: destinationAccount._id,
            value: value,
            state: 'initial',
            lastModified: new Date()
          });
        }).then(function (transaction) {
          return _transaction2.default.update({
            _id: transaction._id,
            state: "initial"
          }, {
            $set: {
              state: "pending"
            },
            $currentDate: {
              lastModified: true
            }
          }).then(function () {
            return transaction;
          });
        }).then(function (transaction) {
          var promiseArray = [];

          promiseArray.push(_account2.default.update({
            _id: transaction.source,
            pendingTransactions: {
              $ne: transaction._id
            }
          }, {
            $inc: {
              value: -transaction.value
            },
            $push: {
              pendingTransactions: transaction._id
            }
          }));

          promiseArray.push(_account2.default.update({
            _id: transaction.destination,
            pendingTransactions: {
              $ne: transaction._id
            }
          }, {
            $inc: {
              value: transaction.value
            },
            $push: {
              pendingTransactions: transaction._id
            }
          }));

          return _bluebird2.default.all(promiseArray).then(function (results) {
            return transaction;
          }).catch(function (err) {
            return _transaction2.default.update({
              _id: transaction._id,
              state: "pending"
            }, {
              $set: {
                state: "canceling"
              },
              $currentDate: {
                lastModified: true
              }
            }).then(function () {
              var promiseArray = [];

              promiseArray.push(_account2.default.update({
                _id: transaction.source,
                pendingTransactions: {
                  $ne: transaction._id
                }
              }, {
                $inc: {
                  value: transaction.value
                },
                $push: {
                  pendingTransactions: transaction._id
                }
              }));

              promiseArray.push(_account2.default.update({
                _id: transaction.destination,
                pendingTransactions: {
                  $ne: transaction._id
                }
              }, {
                $inc: {
                  value: -transaction.value
                },
                $push: {
                  pendingTransactions: transaction._id
                }
              }));

              return _bluebird2.default.all(promiseArray).then(function (results) {
                return transaction;
              });
            }).then(function () {
              return _transaction2.default.update({
                _id: transaction._id,
                state: "canceling"
              }, {
                $set: {
                  state: "canceled"
                },
                $currentDate: {
                  lastModified: true
                }
              }).then(function () {
                return err;
              });
            });
          });
        }).then(function (transaction) {
          return _transaction2.default.update({
            _id: transaction._id,
            state: "pending"
          }, {
            $set: {
              state: "applied"
            },
            $currentDate: {
              lastModified: true
            }
          }).then(function () {
            return transaction;
          });
        }).then(function (transaction) {
          var promiseArray = [];

          promiseArray.push(_account2.default.update({
            _id: transaction.source,
            pendingTransactions: transaction._id
          }, {
            $pull: {
              pendingTransactions: transaction._id
            }
          }));

          promiseArray.push(_account2.default.update({
            _id: transaction.destination,
            pendingTransactions: transaction._id
          }, {
            $pull: {
              pendingTransactions: transaction._id
            }
          }));

          return _bluebird2.default.all(promiseArray).then(function (results) {
            return transaction;
          });
        }).then(function (transaction) {
          return _transaction2.default.update({
            _id: transaction._id,
            state: "applied"
          }, {
            $set: {
              state: "done"
            },
            $currentDate: {
              lastModified: true
            }
          }).then(function () {
            return transaction;
          });
        }).then(function (transaction) {
          return res.status(200).json({
            message: 'You do transfer to CPF: ' + transaction.destination.cpf + ' the amount of ' + transaction.value
          });
        }).catch(function (err) {
          var message = err ? err.message : 'An unespected error has occurred';
          return res.status(500).json({ message: message });
        });
      }

      return res.status(500).json({ message: 'Please, use a valid dataset.' });
    }
  }]);

  return TransactionsController;
}();

var transference = TransactionsController.transference;

exports.transference = transference;