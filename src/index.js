import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { createHashHistory } from 'history';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const history = createHashHistory();

ReactDOM.render(
  <React.StrictMode>
    <HashRouter basename="/collabeat" history={history}>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
