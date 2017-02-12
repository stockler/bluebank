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

var TransactionSchema = new Schema({
    source: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    destination: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    value: Number,
    state: {
        type: String,
        enum: ['initial', 'pending', 'applied', 'done', 'canceling', 'canceled']
    },
    lastModified: Date
});

exports.default = _db2.default.model('Transaction', TransactionSchema);