import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import OfflinePlugin from 'offline-plugin/runtime';

import configureStore from './stores';
import App from './components/App';

const store = configureStore();

const renderApp = store => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  );
};

renderApp(store);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    renderApp(store);
  });
}

if (__PRODUCTION__) OfflinePlugin.install();
