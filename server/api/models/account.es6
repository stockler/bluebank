'use strict';

import mongoose from 'mongoose';
import db from '../helpers/db';

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
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
	    transform: function (doc, ret) {
	      delete ret._id;
	      delete ret.value;
	      delete ret.pendingTransactions;
	    }
	}
});

AccountSchema.index({ agency: 1, accountNumber: 1 }, { unique: true, sparse: true, trim: true });

export default db.model('Account', AccountSchema);