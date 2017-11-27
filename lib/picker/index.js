'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getIndex = function getIndex(list, item) {
  if (list && list.length < 1) {
    return 0;
  }
  var index1 = _lodash2.default.findIndex(list, item);
  var index2 = list.indexOf(item);
  var index = Math.max(index1, index2);
  if (index < 0) {
    throw new Error('list数组中不存在defaultValue');
  }
  return index;
};

var Picker = function (_React$Component) {
  _inherits(Picker, _React$Component);

  function Picker(props) {
    _classCallCheck(this, Picker);

    var _this = _possibleConstructorReturn(this, (Picker.__proto__ || Object.getPrototypeOf(Picker)).call(this));

    _this.props = props;
    _this.startY = 0;
    _this.endY = 0;
    //当前拖动的Y坐标
    _this.currentY = 0;
    _this.itemHeight = 36;
    _this.selectedIndex = _this.getInitialIndex();
    _this.state = { style: {} };
    _this._defaultValue = null;
    return _this;
  }

  // 初始化获得selectedIndex


  _createClass(Picker, [{
    key: 'getInitialIndex',
    value: function getInitialIndex() {
      var index = getIndex(this.props.data.list, this.props.data.defaultValue);
      if (!this.props.data.defaultValue && this.props.data.list.length > 3) {
        index = Math.floor(this.props.data.list.length / 2);
      }
      return index;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var isEqual = _lodash2.default.isEqual(nextProps.data.defaultValue, this._defaultValue);
      if (!isEqual) {
        this._defaultValue = nextProps.data.defaultValue;
        this.selectedIndex = this.getReceivePropsIndex(nextProps.data);
        if (this.selectedIndex === 0) {
          this.setState({
            style: {
              transform: 'translate3d(0px, ' + this.itemHeight * 2 + 'px, 0px)'
            }
          });
        }
      }
    }
  }, {
    key: 'getReceivePropsIndex',
    value: function getReceivePropsIndex(data) {
      if (this._defaultValue) {
        this.selectedIndex = getIndex(data.list, data.defaultValue);
      }
      return this.selectedIndex;
    }
  }, {
    key: 'getInitialStyle',
    value: function getInitialStyle() {
      this.currentY = 0;
      if (this.selectedIndex > 2) {
        this.currentY = -(this.selectedIndex - 2) * this.itemHeight;
      } else {
        this.currentY = (2 - this.selectedIndex) * this.itemHeight;
      }
      return 'translate3d(0px, ' + this.currentY + 'px, 0px)';
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(e) {
      e.preventDefault();
      if (this.props.data.list.length <= 1) {
        return;
      }
      this.startY = e.nativeEvent.changedTouches[0].pageY;
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(e) {
      e.preventDefault();
      if (this.props.data.list.length <= 1) {
        return;
      }
      this.endY = e.nativeEvent.changedTouches[0].pageY;
      // 实际滚动距离
      var v = parseInt(this.endY - this.startY);
      var value = v % this.itemHeight;
      // 计算出每次拖动的36px整倍数
      this.currentY += v - value;

      // 正数y最大值
      var max1 = 2 * this.itemHeight;
      // 负数y最小值
      var max2 = (this.props.data.list.length - 3) * this.itemHeight;

      if (this.currentY > max1) {
        this.currentY = max1;
      } else if (this.currentY > 0 && this.currentY < max1) {
        this.currentY = this.currentY;
      } else if (this.currentY === max1) {
        this.currentY = this.currentY;
      } else if (Math.abs(this.currentY) > max2) {
        this.currentY = -max2;
      }

      this.countListIndex(this.currentY);

      this.setState({
        style: {
          transform: 'translate3d(0px, ' + this.currentY + 'px, 0px)'
        }
      });
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(e) {
      e.preventDefault();
      if (this.props.data.list.length <= 1) {
        return;
      }
      var pageY = e.nativeEvent.changedTouches[0].pageY;
      var value = parseInt(pageY - this.startY);
      var y = this.currentY + value;
      var style = 'translate3d(0px, ' + y + 'px, 0px)';
      this.setState({
        style: {
          transform: style
        }
      });
    }

    // 计算list数组索引

  }, {
    key: 'countListIndex',
    value: function countListIndex(pageY) {
      var n = pageY / this.itemHeight;
      n = n > 0 ? 2 - n : Math.abs(n) + 2;
      this.setSelectedValue(n);
    }

    // set选中值

  }, {
    key: 'setSelectedValue',
    value: function setSelectedValue(index) {
      var length = this.props.data.list.length;
      if (length === 0) {
        this.callback(null);
        return;
      }
      if (index < 0 || index > length - 1) {
        throw new Error('滑动取值索引数值出现错误' + index);
      }
      var value = this.props.data.list[index];
      this.selectedIndex = index;

      this.callback(value);
    }

    // 回调

  }, {
    key: 'callback',
    value: function callback(value) {
      this.props.onChange(value);
    }
  }, {
    key: 'getSelectedClass',
    value: function getSelectedClass(index) {
      if (this.selectedIndex === index) {
        return 'ui-picker-item-selected';
      }
      return '';
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setSelectedValue(this.selectedIndex);
    }
  }, {
    key: 'handleWrapperStart',
    value: function handleWrapperStart(e) {
      e.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = {
        transform: this.getInitialStyle()
      };
      return _react2.default.createElement(
        'div',
        { className: 'ui-picker-wrapper', onTouchStart: this.handleWrapperStart.bind(this) },
        _react2.default.createElement(
          'div',
          { className: 'ui-picker',
            style: this.state.style.transform ? this.state.style : style,
            onTouchStart: this.handleTouchStart.bind(this),
            onTouchMove: this.handleTouchMove.bind(this),
            onTouchEnd: this.handleTouchEnd.bind(this) },
          this.props.data.list.map(function (data, index) {
            var displayValue = _this2.props.data.displayValue(data);
            return _react2.default.createElement(
              'div',
              { key: index,
                className: 'ui-picker-item ' + _this2.getSelectedClass(index) },
              displayValue
            );
          })
        ),
        _react2.default.createElement('div', { className: 'ui-picker-center' })
      );
    }
  }]);

  return Picker;
}(_react2.default.Component);

Picker.propTypes = {
  // 数据源
  data: _propTypes2.default.object.isRequired,
  // 当停止滑动选中立即回调onchange方法
  onChange: _propTypes2.default.func.isRequired
};

exports.default = Picker;
//# sourceMappingURL=index.js.map