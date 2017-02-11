'use strict';

import mongoose from 'mongoose';
import Promise from 'bluebird';

const uri = 'mongodb://localhost:27017/ibm'; //'mongodb://testeIBM:TesteIBM#@ds147799.mlab.com:47799/ibm';
const db = mongoose.connect(uri);

db.Promise = Promise;

export default db;




