import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import articlesReducer from './store/reducers/articlesReducer';
import messangerReducer from './store/reducers/messangerReducer';

const rootReducer = combineReducers({
    articles: articlesReducer,
    messanger: messangerReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const jsx = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
