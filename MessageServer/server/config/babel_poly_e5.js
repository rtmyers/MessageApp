module.exports.default = (() => {
	if (!global || !global._babelPolyfill) { // eslint-disable-line
		require('babel-polyfill'); // eslint-disable-line global-require
	}
})();
