import React from 'react';
import {Link} from 'react-router-dom';

export default class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="home">
        <div className="list">
          <div className="item">
            <Link className="item-label" to="/picker-demo">
              picker demo
            </Link>
          </div>
        </div>
      </div>
    )
  }

}
