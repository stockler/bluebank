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
import TransactionModel from '../models/transaction';
import Promise from 'bluebird';

class TransactionsController {
  static transference(req, res) {    
    let data = req.swagger.params.transference.value;

    let sourceAgency;
    let sourceAccountNumber;
    let destinationAgency;
    let destinationAccountNumber;
    let value;

    if (data) {
      sourceAgency = data.sourceAgency;
      sourceAccountNumber = data.sourceAccountNumber;
      destinationAgency = data.destinationAgency;
      destinationAccountNumber = data.destinationAccountNumber;
      value = data.value;

      return Promise.try(() => {
        let sourceAccount = AccountModel
          .findOne({
            agency: sourceAgency,
            accountNumber: sourceAccountNumber
          })
          .then((account) => {
            return account;
          });

        let destinationAccount = AccountModel
          .findOne({
            agency: destinationAgency,
            accountNumber: destinationAccountNumber
          })
          .then((account) => {
            return account;
          });

        return [sourceAccount, destinationAccount]
      })
      .spread((sourceAccount, destinationAccount) => {

        if (sourceAccount.value - value < 0) {
          throw new Error('You haven\'t sufficient ammount on your account for this operation');
        }

        return TransactionModel.create({ 
          source: sourceAccount._id, 
          destination: destinationAccount._id, 
          value: value, 
          state: 'initial',
          lastModified: new Date() 
        });
      })
      .then((transaction) => {
        return TransactionModel.update({ 
            _id: transaction._id, 
            state: "initial" 
          }, {
            $set: { 
              state: "pending" 
            },
            $currentDate: { 
              lastModified: true 
            }
          })
        .then(() => {
          return transaction;
        });
      })
      .then((transaction) => {
        let promiseArray = [];

        promiseArray.push(AccountModel.update({ 
            _id: transaction.source, 
            pendingTransactions: { 
              $ne: transaction._id 
            } 
          },
          { 
            $inc: { 
              value: -transaction.value 
            }, 
            $push: { 
              pendingTransactions: transaction._id 
            } 
          }));

        promiseArray.push(AccountModel.update({ 
            _id: transaction.destination, 
            pendingTransactions: { 
              $ne: transaction._id 
            } 
          },
          { 
            $inc: { 
              value: transaction.value 
            }, 
            $push: { 
              pendingTransactions: transaction._id 
            } 
          }));

        return Promise
          .all(promiseArray)
          .then((results) => {
            return transaction;
          })
          .catch((err) => {
            return TransactionModel.update({ 
                _id: transaction._id, 
                state: "pending" 
              }, {
                $set: { 
                  state: "canceling" 
                },
                $currentDate: { 
                  lastModified: true 
                }
              })
              .then(() => {
                let promiseArray = [];

                promiseArray.push(AccountModel.update({ 
                    _id: transaction.source, 
                    pendingTransactions: { 
                      $ne: transaction._id 
                    } 
                  },
                  { 
                    $inc: { 
                      value: transaction.value 
                    }, 
                    $push: { 
                      pendingTransactions: transaction._id 
                    } 
                  }));

                promiseArray.push(AccountModel.update({ 
                    _id: transaction.destination, 
                    pendingTransactions: { 
                      $ne: transaction._id 
                    } 
                  },
                  { 
                    $inc: { 
                      value: -transaction.value 
                    }, 
                    $push: { 
                      pendingTransactions: transaction._id 
                    } 
                  }));

                return Promise
                  .all(promiseArray)
                  .then((results) => {
                    return transaction;
                  });
              })
              .then(() => {
                return TransactionModel.update({ 
                  _id: transaction._id, 
                  state: "canceling" 
                }, {
                  $set: { 
                    state: "canceled" 
                  },
                  $currentDate: { 
                    lastModified: true 
                  }
                })
                .then(() => {
                  return err;
                });
              });
          });
      })
      .then((transaction) => {
        return TransactionModel.update({ 
            _id: transaction._id, 
            state: "pending" 
          },
          {
            $set: { 
              state: "applied" 
            },
            $currentDate: { 
              lastModified: true 
            }
          })
          .then(() => {
            return transaction;
          });
      })
      .then((transaction) => {
        let promiseArray = [];

        promiseArray.push(AccountModel.update({ 
            _id: transaction.source, 
            pendingTransactions: transaction._id 
          },
          { 
            $pull: { 
              pendingTransactions: transaction._id 
            } 
          }));

        promiseArray.push(AccountModel.update({ 
            _id: transaction.destination, 
            pendingTransactions: transaction._id 
          },
          { 
            $pull: { 
              pendingTransactions: transaction._id 
            } 
          }));

        return Promise
          .all(promiseArray)
          .then((results) => {
            return transaction;
          });
      })
      .then((transaction) => {
        return TransactionModel.update({ 
            _id: transaction._id, 
            state: "applied" 
          },
          {
            $set: { 
              state: "done" 
            },
            $currentDate: { 
              lastModified: true 
            }
          });
      })
      .then(() => {
        return res.status(200).json({
          message: 'OK'
        })
      })
      .catch((err) => {
        let message = err ? err.message : 'An unespected error has occurred';
        return res.status(500).json({ message: message });
      });
    }

    return res.status(500).json({ message: 'Please, use a valid dataset.' });  
    
  }
}

const transference = TransactionsController.transference;

export {transference};