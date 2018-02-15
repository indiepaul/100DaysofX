import React from 'react';
import registerServiceWorker from './helpers/registerServiceWorker';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import store from "./store/index";
import Routes from './routes'

render((
    <Provider store={store}>
        <Routes />
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
