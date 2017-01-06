import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import Layout from './container/layout.jsx';
import HomeRoute from './container/home/index.jsx';
import PickerRoute from './container/picker/picker-demo.jsx';

import './scss/index.scss';

render(
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={HomeRoute}/>
      <Route path='/home' component={HomeRoute}></Route>
      <Route path='/picker-demo' component={PickerRoute}></Route>
    </Route>
  </Router>,
  document.getElementById('app')
);
