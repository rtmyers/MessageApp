// import Auth0Strategy from 'passport-auth0';
// import parseurl from 'parseurl';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import uuid from 'uuid/v4';
import cors from 'cors';
import graphql from 'express-graphql';
import './server/config/babel_polyfill';
import Config from './server/config/config.json';
import gql from './server/graphql';

// const graphqlExpress = new GraphqlExpress();

const app = require('express')();

require('dotenv').config({ silent: true });

// connect to db
require('./server/db/mongoose')().catch(err => app.next(err));

// setting open cors policy here, add rules before production build
// app.use('*', cors());
app.use(require('morgan')('dev'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
	genid: (req) => {
		console.log('Inside the session middleware');
		console.log(req.sessionID);
		return uuid(); // use UUIDs for session IDs
	},
	secret: Config.secret,
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(
	'/graphql',
	cors(),
	bodyParser.json(),
	graphql({ gql, endpointURL: '/graphql' })
);

app.listen(Config.port, () => console.log(`Server listening on port ${Config.port}`));

app.use((err, req, res) => {
	console.warn(err);
	res.status(err.status || 500);
	res.json({
		errors: {
			message: err.message,
			error: err,
		}
	});
	res.end();
});

module.exports = app;
