'use strict';

let AccountModel = require('./api/models/account').default;
let Promise = require('bluebird');

let promiseArray = [];

promiseArray.push(AccountModel.create({
	agency: 3505,
	accountNumber: 45380,
	cpf: 12345678900,
	value: 1000
}));

promiseArray.push(AccountModel.create({
	agency: 3505,
	accountNumber: 45322,
	cpf: 31200023499,
	value: 1000
}));

promiseArray.push(AccountModel.create({
	agency: 3408,
	accountNumber: 12345,
	cpf: 12345698700,
	value: 1000
}));

promiseArray.push(AccountModel.create({
	agency: 2143,
	accountNumber: 09831,
	cpf: 32198712300,
	value: 1000
}));

return Promise
	.all(promiseArray)
	.then((results) => {
		console.log(results);
	});
