import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider} from 'react-redux';
import storeCreator from './store/index';
import { CookiesProvider } from 'react-cookie';

export const {store, history} = storeCreator;
ReactDOM.render(
    <CookiesProvider>
        <Provider store={store} >
            <App history={history}/>
        </Provider>
    </CookiesProvider>,
    document.getElementById('root'));
serviceWorker.unregister();
