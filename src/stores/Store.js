/* eslint global-require:0 */
import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            name: 'Population'
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middleware)
);

const store = createStore(
    reducers,
    {},
    enhancer
);


sagaMiddleware.run(sagas);

window.store = store;
export default store;