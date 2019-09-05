import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer, {IRootState} from './store/index'
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore<IRootState, any, any, any>(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
