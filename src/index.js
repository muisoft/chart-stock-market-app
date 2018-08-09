import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import WebFontLoader from 'webfontloader';
   
import store from './store';

import 'font-awesome/css/font-awesome.min.css';
import './components/style/styles.css';

WebFontLoader.load({
  google: {
  families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
