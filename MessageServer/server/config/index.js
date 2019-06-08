const env = process.env.NODE_ENV || 'dev';

module.exports = [
	require(`./config.${env}`), // eslint-disable-line
	require('./babel_polyfill') // eslint-disable-line global-require
];
