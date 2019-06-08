import mongoose from 'mongoose';

import Config from '../config/config.json';

module.exports = async () => {
	mongoose.Promise = global.Promise;
	console.warn(Config.db);

	const db = mongoose.connect(Config.db.source, { useNewUrlParser: true });

	mongoose.set('debug', Config.db.debug);

	mongoose.connection.on('error', (err) => {
		console.warn('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
		console.warn(`Connection error: ${err.message}`);
		throw new Error(err);
	}).once('open', () => {
		console.warn('config ', Config);
		console.warn('Connection extablised with MongoDB');
	});

	return db;
};
