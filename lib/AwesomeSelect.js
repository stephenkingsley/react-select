'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style/index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AwesomeSelect = function (_Component) {
  _inherits(AwesomeSelect, _Component);

  function AwesomeSelect(props) {
    _classCallCheck(this, AwesomeSelect);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AwesomeSelect).call(this, props));

    _this.onFocus = _this.onFocus.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.clickIcon = _this.clickIcon.bind(_this);
    _this.banBlur = _this.banBlur.bind(_this);
    _this.cancelBanBlur = _this.cancelBanBlur.bind(_this);
    _this.chooseItem = _this.chooseItem.bind(_this);
    _this.inputText = _this.inputText.bind(_this);
    _this.state = {
      data: props.data,
      copyData: props.data,
      open: false,
      banBlur: false,
      text: '',
      style: props.style || {}
    };
    return _this;
  }

  _createClass(AwesomeSelect, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        data: nextProps.data,
        copyData: nextProps.data,
        text: ''
      });
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      this.setState({
        open: true
      });
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      var banBlur = this.state.banBlur;

      if (!banBlur) {
        this.setState({
          open: false
        });
      }
    }
  }, {
    key: 'clickIcon',
    value: function clickIcon() {
      var open = this.state.open;

      if (open) {
        this.setState({
          open: false
        });
      } else {
        this.refs.select.focus();
      }
    }
  }, {
    key: 'chooseItem',
    value: function chooseItem(event) {
      var data = event.target.dataset;
      this.props.onChange(data.value, data.name);
      this.setState({
        open: false,
        text: data.name
      });
    }
  }, {
    key: 'banBlur',
    value: function banBlur() {
      this.setState({
        banBlur: true
      });
    }
  }, {
    key: 'cancelBanBlur',
    value: function cancelBanBlur() {
      this.setState({
        banBlur: false
      });
    }
  }, {
    key: 'inputText',
    value: function inputText(event) {
      var copyData = this.state.copyData;

      var text = event.target.value;
      var filterValue = copyData.filter(function (element) {
        return element.name.toLowerCase().match(text.toLowerCase()) !== null;
      });
      if (text === '') {
        filterValue = copyData;
      }
      this.setState({
        text: text,
        data: filterValue
      });
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions() {
      var _this2 = this;

      var _state = this.state;
      var data = _state.data;
      var style = _state.style;

      var optionsWidth = {};
      if (style.width) {
        optionsWidth = Number(style.width.split('px')[0]) + 10;
      }
      return _react2.default.createElement(
        'div',
        {
          style: { width: optionsWidth + 'px' },
          className: 'optionContainer'
        },
        _react2.default.createElement(
          'div',
          {
            className: 'optionBody',
            onMouseOver: this.banBlur,
            onMouseLeave: this.cancelBanBlur
          },
          data.map(function (ele, index) {
            return _react2.default.createElement(
              'div',
              {
                key: index,
                className: 'option',
                'data-name': ele.name,
                'data-value': ele.value,
                onClick: _this2.chooseItem
              },
              ele.name
            );
          })
        ),
        this.renderFooter()
      );
    }
  }, {
    key: 'renderFooter',
    value: function renderFooter() {
      var data = this.state.data;

      return _react2.default.createElement(
        'div',
        { className: 'footerOption' },
        data.length,
        ' items'
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state;
      var open = _state2.open;
      var text = _state2.text;
      var style = _state2.style;

      var defaultStyle = {
        width: '200px',
        height: '38px'
      };
      var container = {
        border: '1px solid #00bcd4',
        borderRadius: '' + (open ? '3px 3px 0 0' : '3px'),
        outline: 0,
        padding: '0 5px'
      };
      var iconMarginTop = void 0;
      if (style.height) {
        iconMarginTop = (Number(style.height.split('px')[0]) - 10) / 2;
      }
      var containerStyle = Object.assign(defaultStyle, style, container);
      var iconStyle = (open ? 'upIcon' : 'downIcon') + ' icon';
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'container' },
          _react2.default.createElement('input', {
            ref: 'select',
            type: 'text',
            style: containerStyle,
            value: text,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            onChange: this.inputText
          }),
          _react2.default.createElement('div', {
            style: { marginTop: iconMarginTop + 'px' },
            className: iconStyle,
            onClick: this.clickIcon,
            onMouseOver: this.banBlur,
            onMouseLeave: this.cancelBanBlur
          })
        ),
        open && this.renderOptions()
      );
    }
  }]);

  return AwesomeSelect;
}(_react.Component);

exports.default = AwesomeSelect;


AwesomeSelect.propTypes = {
  data: _react2.default.PropTypes.array.isRequired,
  onChange: _react2.default.PropTypes.func.isRequired,
  style: _react2.default.PropTypes.object
};