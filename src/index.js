import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory, Router } from 'react-router'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import createRoutes from './routes'
import configStore from './store'

const store = configStore(hashHistory);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
        {createRoutes(store)}
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
registerServiceWorker();
