'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uri = process.env.DB || 'mongodb://localhost:27017/ibm';
var db = _mongoose2.default.connect(uri);

db.Promise = _bluebird2.default;

exports.default = db;