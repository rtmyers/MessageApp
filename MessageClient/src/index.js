import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App.js";

//import { createStore } from "redux";
import initStore from './app/models/store.js';

import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';


// import { ApolloProvider } from 'react-apollo';
//import createClient from './app/models/gql/apollo';
//const client = createClient();

import './app/config.b.js';

const browserHistory = createHistory({
    basename: '/'
});

const initialState = window.___INITIAL_STATE__;
const store = initStore(initialState, browserHistory);

const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: (initialState) => initialState.router
});

const routes = require('./app/routes').default(store);

const AppContainer = props => {
    const { store, history, routes, routerKey } = this.props;
    return(
        <App
            {...this.props}
        />
    );
};

const Render = (routerKey=null) => (
    <AppContainer />
    /*
    <ApolloProvider client ={createClient()}>
        <MultiThemeProvider>
            <App />
        </MultiThemeProvider>
    </ApolloProvider>
    */
);

ReactDOM.render(<Render />, document.getElementById("root"));