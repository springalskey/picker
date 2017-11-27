import React from 'react'
import ReactDOM from 'react-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

const propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func
}

class BaseModal extends React.Component {
  constructor() {
    super()
  }

  componentDidUpdate() {
    if (this.refs.modalOverlay && !this.refs.modalOverlay.onclick) {
      // 点击阴影背景时cancel() popup
      this.refs.modalOverlay.onclick = e => {
        e.stopPropagation()
        this.props.onCancel && this.props.onCancel()
      }

      // 点击modal阻止默认行为
      // 原理：react event listener中无法阻止原生事件，所以用原生事件来替代react事件
      this.refs.modal.onclick = e => e.stopPropagation()
    }
  }

  render() {
    let modal = null
    if (this.props.visible) {
      modal = (
        <div
          className="modal-overlay"
          ref={modalOverlay => {
            this.modalOverlay = modalOverlay
          }}
        >
          <div
            className="modal"
            ref={modal => {
              this.modal = modal
            }}
          >
            {this.props.children}
          </div>
        </div>
      )
    } else {
      return <div />
    }
    return (
      <CSSTransition classNames="modal-transition" timeout={240} in={true}>
        {modal}
      </CSSTransition>
    )
  }
}

BaseModal.propTypes = propTypes

export default BaseModal
