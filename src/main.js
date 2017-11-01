import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route, IndexRoute} from 'react-router-dom';

import Layout from './container/layout';
import HomeRoute from './container/home';
import PickerRoute from './container/picker/picker-demo';

import './scss/index.scss';

render(
  <BrowserRouter>
        <Route path="/" component={PickerRoute} />
  </BrowserRouter>,
  document.getElementById('app')
);

