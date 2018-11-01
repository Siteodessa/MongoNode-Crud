import registerServiceWorker from './registerServiceWorker';

import css from './css/z.css';
import bootstrap from './css/bootstrap.min.css';
import './App.css';

import { createStore, applyMiddleware  } from 'redux';
import reducer from './reducers'
import { composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import About from './About';
// import {  } from 'react-router';
import { Router, Route , HashRouter, Link  } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import { syncHistoryWithStore } from 'react-router-redux';
import Card from './Card'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
const history = syncHistoryWithStore(createHistory(), store)

store.subscribe(() => {
  console.log('subscribe', store.getState());
})

ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
        <div>
        <Route exact path="/" component={App} />
        <Route path="/about" component={About} />
        <Route path="/cards/:id" component={Card} />
        </div>
        </Router>
      </Provider>,
      document.getElementById('root'));
registerServiceWorker();
