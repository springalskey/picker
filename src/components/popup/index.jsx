import React from 'react';
import ReactDOM from 'react-dom';
import BaseModal from '../modal/BaseModal';

const propTypes = {
  visible: React.PropTypes.bool.isRequired,
  onConfirm: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
};

class Popup extends React.Component {
  constructor() {
    super();
  }

  handleCancel () {
    document.body.style.cssText = '';
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  handleConfirm() {
    document.body.style.cssText = '';
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  render () {
    const isZh = !navigator.language || 
                  navigator.language === 'zh-CN' || 
                  navigator.language === 'zh';
    let text1 = !isZh ? 'Cancel' : '取消';
    let text2 = !isZh ? 'Finish' : '完成';
    return (
      <BaseModal
        visible={this.props.visible}>
          <div className="ui-popup-title">
            <span onClick={this.handleCancel.bind(this)}>{text1}</span>
            <span onClick={this.handleConfirm.bind(this)}>{text2}</span>
          </div>
          <div className="ui-popup-content">
            {this.props.children}
          </div>
      </BaseModal>
    )
  }
}

Popup.propTypes = propTypes;

export default Popup;
