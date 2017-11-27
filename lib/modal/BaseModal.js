'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactTransitionGroup = require('react-transition-group');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  visible: _propTypes2.default.bool.isRequired,
  onCancel: _propTypes2.default.func
};

var BaseModal = function (_React$Component) {
  _inherits(BaseModal, _React$Component);

  function BaseModal() {
    _classCallCheck(this, BaseModal);

    return _possibleConstructorReturn(this, (BaseModal.__proto__ || Object.getPrototypeOf(BaseModal)).call(this));
  }

  _createClass(BaseModal, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _this2 = this;

      if (this.refs.modalOverlay && !this.refs.modalOverlay.onclick) {
        // 点击阴影背景时cancel() popup
        this.refs.modalOverlay.onclick = function (e) {
          e.stopPropagation();
          _this2.props.onCancel && _this2.props.onCancel();
        };

        // 点击modal阻止默认行为
        // 原理：react event listener中无法阻止原生事件，所以用原生事件来替代react事件
        this.refs.modal.onclick = function (e) {
          return e.stopPropagation();
        };
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var modal = null;
      if (this.props.visible) {
        modal = _react2.default.createElement(
          'div',
          {
            className: 'modal-overlay',
            ref: function ref(modalOverlay) {
              _this3.modalOverlay = modalOverlay;
            }
          },
          _react2.default.createElement(
            'div',
            {
              className: 'modal',
              ref: function ref(modal) {
                _this3.modal = modal;
              }
            },
            this.props.children
          )
        );
      } else {
        return _react2.default.createElement('div', null);
      }
      return _react2.default.createElement(
        _reactTransitionGroup.CSSTransition,
        { classNames: 'modal-transition', timeout: 240, 'in': true },
        modal
      );
    }
  }]);

  return BaseModal;
}(_react2.default.Component);

BaseModal.propTypes = propTypes;

exports.default = BaseModal;
//# sourceMappingURL=BaseModal.js.map