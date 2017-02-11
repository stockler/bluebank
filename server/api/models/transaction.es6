'use strict';

import mongoose from 'mongoose';
import db from '../helpers/db';

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
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
    	enum: ['initial', 'pending', 'applied', 'done', 'canceling', 'canceled'],
    },
    lastModified: Date
});

export default db.model('Transaction', TransactionSchema);