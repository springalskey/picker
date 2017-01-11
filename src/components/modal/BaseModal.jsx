import React from 'react';
import ReactDOM from 'react-dom';
import './BaseModal.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const propTypes = {
  visible: React.PropTypes.bool.isRequired
}

class BaseModal extends React.Component {
  constructor() {
    super();
  }

  handleClick (e) {
    e.nativeEvent.stopImmediatePropagation();
  }

  render () {
    let modal = null;
    if (this.props.visible) {
      modal = (
        <div className="modal-overlay">
          <div className="modal"
            onClick={this.handleClick.bind(this)}>
            {this.props.children}
          </div>
        </div>
      );
      // 当关闭modal时，不要忘记设置 css = '';
      const css = 'overflow:hidden; position:fixed; left:0; top:0; bottom:0;';
      document.body.style.cssText = css;
    }
    return (
      <ReactCSSTransitionGroup
        transitionName="modal-transition"
        transitionEnterTimeout={240}
        transitionLeaveTimeout={240}>
        { modal }
      </ReactCSSTransitionGroup>
    );
  }
}

BaseModal.propTypes = propTypes;

export default BaseModal;


