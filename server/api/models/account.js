'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _db = require('../helpers/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var AccountSchema = new Schema({
    cpf: {
        type: Number,
        index: true,
        unique: true,
        sparse: true,
        trim: true
    },
    agency: Number,
    accountNumber: Number,
    pendingTransactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
    value: {
        type: Number,
        default: 0.0
    }
}, {
    toJSON: {
        transform: function transform(doc, ret) {
            delete ret._id;
            delete ret.value;
            delete ret.pendingTransactions;
        }
    }
});

AccountSchema.index({ agency: 1, accountNumber: 1 }, { unique: true, sparse: true, trim: true });

exports.default = _db2.default.model('Account', AccountSchema);