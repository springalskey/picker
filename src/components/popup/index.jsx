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
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  handleConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  /**
   * 使用原生事件替代react事件
   * 当BaseModal modal使用原生事件来阻止冒泡时
   * 完成与取消按钮的react onClick会失效，所以使用原生事件而不使用react事件
   */
  componentDidUpdate () {
    if (this.refs.confirmButton && 
      !this.refs.confirmButton.onclick) {

      this.refs.confirmButton.onclick = (e) => {
        e.stopPropagation();
        this.handleConfirm();
      }
      this.refs.cancelButton.onclick =(e) => {
        e.stopPropagation();
        this.handleCancel();
      }
    }
  }

  render () {
    const isZh = !navigator.language || 
                  navigator.language.toLowerCase() === 'zh-cn' || 
                  navigator.language.toLowerCase() === 'zh';
    let text1 = !isZh ? 'Cancel' : '取消';
    let text2 = !isZh ? 'Finish' : '完成';
    return (
      <BaseModal
        onCancel={this.handleCancel.bind(this)}
        visible={this.props.visible}>
          <div className="ui-popup-title">
            <span ref="cancelButton">{text1}</span>
            <span ref="confirmButton">{text2}</span>
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
