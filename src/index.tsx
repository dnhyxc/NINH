import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './model/store';
import RouterConfig from './router';
import './index.less';

ReactDOM.render(
  <Provider store={store}>
    <RouterConfig />
  </Provider>,
  document.getElementById('root')
);
