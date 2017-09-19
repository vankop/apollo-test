import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {ApolloClient, createNetworkInterface, ApolloProvider} from 'react-apollo';

import './index.css';
import App from './App';
import {company} from './store/company';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: '/graphql'
    }),
});

const store = createStore(
    combineReducers({
        apollo: client.reducer(),
        company
    }),
    {},
    compose(
        applyMiddleware(client.middleware()),
        (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    )
);

ReactDOM.render(
    <ApolloProvider store={store} client={client}>
        <App/>
    </ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
