import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import BaseModal from '../modal/BaseModal';

class Popup extends React.Component {
  constructor() {
    super();
  }

  handleClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render () {
    return (
      <BaseModal
        visible={this.props.visible}>
          <div className="ui-popup-title">
            <span onClick={this.handleClose.bind(this)}>完成</span>
          </div>
          <div className="ui-popup-content">
            {this.props.children}
          </div>
      </BaseModal>
    )
  }
}

export default Popup;
