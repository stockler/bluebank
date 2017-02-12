'use strict';

import mongoose from 'mongoose';
import Promise from 'bluebird';

const uri = process.env.DB || 'mongodb://localhost:27017/ibm'; 
const db = mongoose.connect(uri);

db.Promise = Promise;

export default db;




