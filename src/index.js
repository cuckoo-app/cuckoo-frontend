import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import { Router, Route } from 'react-router'
import {
  HashRouter,
  Route,
  Link
} from 'react-router-dom';

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render((
  <HashRouter>
    <div>
      <Route path="/" component={App}/>
    </div>
  </HashRouter>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
