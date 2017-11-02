import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="layout">
        {this.props.children}
      </div>
    )
  }
}
