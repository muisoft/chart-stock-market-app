import { createStore, applyMiddleware, compose } from 'redux';
import thunk  from 'redux-thunk';
import reducers from './reducers';


//export const history = createHistory();
const enhancers = []

if( process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension
    if(typeof devToolsExtension === 'function'){
        enhancers.push(devToolsExtension())
    }
}

const middleware = [
   thunk
];
const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
)

const store = createStore(
    reducers,
    composedEnhancers
)
export default store;
