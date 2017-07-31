import { Router, browserHistory ,Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Home from './components/Home';

import About from './components/About';

import store from './stores/Store';
import './styles/main.scss';

ReactDOM.render(
    <Provider store={store}>
            <Router history={browserHistory} >
                <Route path='/' component={ App }>
                    <IndexRoute component={ Home } />
                    <Route path='about' component={ About } />
                </Route>
            </Router>
    </Provider>,
    document.getElementById('root')
);

// console.log('Hello World!!');