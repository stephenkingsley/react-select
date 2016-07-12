'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Option = require('./Option');

var _Option2 = _interopRequireDefault(_Option);

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
    _this.cleanSelect = _this.cleanSelect.bind(_this);

    var disposedData = [];
    var placeholderText = void 0;
    var text = void 0;
    var cloneData = _lodash2.default.cloneDeep(props.data);
    if (props.mult) {
      (function () {
        var selectedNum = props.data.length;
        cloneData.forEach(function (ele) {
          var value = ele;
          if (!value.selected) {
            value.selected = false;
            selectedNum--;
          }
          disposedData.push(value);
        });
        placeholderText = selectedNum;
        text = '';
      })();
    } else {
      var initSelectIndex = _lodash2.default.findIndex(props.data, { selected: true });
      cloneData.forEach(function (ele) {
        var value = ele;
        value.selected = false;
        disposedData.push(value);
      });
      if (initSelectIndex >= 0) {
        disposedData[initSelectIndex].selected = true;
        placeholderText = disposedData[initSelectIndex].name;
        text = placeholderText;
      } else {
        text = '';
        placeholderText = '';
      }
    }

    _this.state = {
      text: text,
      placeholderText: placeholderText,
      data: disposedData,
      copyData: disposedData,
      open: false,
      banBlur: false,
      style: props.style || {},
      mult: props.mult || false
    };
    return _this;
  }

  _createClass(AwesomeSelect, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var disposedData = [];
      var placeholderText = void 0;
      var text = void 0;
      var cloneData = _lodash2.default.cloneDeep(nextProps.data);
      if (nextProps.mult) {
        (function () {
          var selectedNum = nextProps.data.length;
          cloneData.forEach(function (ele) {
            var value = ele;
            if (!value.selected) {
              value.selected = false;
              selectedNum--;
            }
            disposedData.push(value);
          });
          placeholderText = selectedNum;
          text = '';
        })();
      } else {
        var initSelectIndex = _lodash2.default.findIndex(nextProps.data, { selected: true });
        cloneData.forEach(function (ele) {
          var value = ele;
          value.selected = false;
          disposedData.push(value);
        });
        if (initSelectIndex >= 0) {
          disposedData[initSelectIndex].selected = true;
          placeholderText = disposedData[initSelectIndex].name;
          text = placeholderText;
        } else {
          text = '';
          placeholderText = '';
        }
      }

      this.setState({
        text: text,
        placeholderText: placeholderText,
        data: disposedData,
        copyData: disposedData
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
        if (this.props.onBlur) {
          this.props.onBlur();
        }
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
    value: function chooseItem(chooseItemData) {
      var _this2 = this;

      var _state = this.state;
      var mult = _state.mult;
      var data = _state.data;
      var copyData = _state.copyData;

      var optionData = chooseItemData;
      if (mult) {
        (function () {
          var tmpData = _lodash2.default.cloneDeep(data);
          var tmpCopyData = _lodash2.default.cloneDeep(copyData);
          var selectedNum = 0;
          tmpData[optionData.index].selected = !tmpData[optionData.index].selected;
          var index = _lodash2.default.findIndex(tmpCopyData, { name: optionData.name });
          tmpCopyData[index].selected = !tmpCopyData[index].selected;
          tmpCopyData.forEach(function (ele) {
            if (ele.selected) {
              selectedNum++;
            }
          });
          _this2.setState({
            data: tmpData,
            copyData: tmpCopyData,
            placeholderText: selectedNum
          });
          _this2.props.onChange(optionData.value, optionData.name, _lodash2.default.filter(tmpData, function (ele) {
            return ele.selected === true;
          }));
          _this2.refs.select.focus();
        })();
      } else {
        this.props.onChange(optionData.value, optionData.name);
        this.setState({
          open: false,
          text: optionData.name
        });
      }
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
    key: 'cleanSelect',
    value: function cleanSelect() {
      var copyData = this.state.copyData;

      var nextData = _lodash2.default.cloneDeep(copyData);
      nextData.forEach(function (ele) {
        var val = ele;
        if (val.selected) {
          val.selected = false;
        }
      });
      this.setState({
        text: '',
        open: false,
        data: nextData,
        copyData: nextData,
        placeholderText: 0
      });
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions() {
      var _this3 = this;

      var _state2 = this.state;
      var data = _state2.data;
      var style = _state2.style;
      var mult = _state2.mult;

      var optionsWidth = {};
      if (style.width) {
        optionsWidth = Number(style.width.split('px')[0]) + 160;
      }
      return _react2.default.createElement(
        'div',
        {
          style: { width: optionsWidth + 'px', minWidth: '310px' },
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
            return _react2.default.createElement(_Option2.default, {
              key: index,
              index: index,
              mult: mult,
              value: ele,
              chooseItem: _this3.chooseItem
            });
          })
        ),
        this.renderFooter()
      );
    }
  }, {
    key: 'renderFooter',
    value: function renderFooter() {
      var _state3 = this.state;
      var data = _state3.data;
      var copyData = _state3.copyData;

      var numOfSelected = 0;
      copyData.forEach(function (ele) {
        if (ele.selected) {
          numOfSelected++;
        }
      });
      return _react2.default.createElement(
        'div',
        { className: 'footerOption' },
        _react2.default.createElement(
          'div',
          null,
          data.length,
          ' items'
        ),
        _react2.default.createElement(
          'div',
          null,
          'choose ',
          numOfSelected,
          ' items'
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _state4 = this.state;
      var open = _state4.open;
      var text = _state4.text;
      var style = _state4.style;
      var placeholderText = _state4.placeholderText;
      var mult = _state4.mult;

      var defaultStyle = {
        width: '150px',
        height: '38px',
        minWidth: '150px',
        minHeight: '38px'
      };
      var container = {
        border: '1px solid #00bcd4',
        borderRadius: '' + (open ? '3px 3px 0 0' : '3px'),
        outline: 0,
        padding: '0 155px 0 5px'
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
            placeholder: mult ? '' : 'choose ' + placeholderText + ' items',
            style: containerStyle,
            value: text,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            onChange: this.inputText
          }),
          mult && _react2.default.createElement(
            'div',
            {
              className: 'spanText'
            },
            _react2.default.createElement(
              'span',
              null,
              'choose ',
              placeholderText,
              ' items'
            )
          ),
          _react2.default.createElement(
            'div',
            {
              style: { marginTop: iconMarginTop + 'px' },
              className: 'cleanIcon',
              onClick: this.cleanSelect
            },
            '×'
          ),
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
  style: _react2.default.PropTypes.object,
  mult: _react2.default.PropTypes.bool,
  onChange: _react2.default.PropTypes.func.isRequired,
  onBlur: _react2.default.PropTypes.func
};