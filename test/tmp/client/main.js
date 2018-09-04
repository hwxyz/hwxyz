import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

// 3.0.0之后需要结构取方法，redux的log中间件
import { createLogger } from 'redux-logger';
import reducer from './reducer/reducer';

import promise from 'redux-promise';

// lodash库
import _ from 'lodash';
console.log(_);

const logger = createLogger();
const store = createStore(
    reducer,
    applyMiddleware(promise, logger)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);
