'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style/index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clickItem = function clickItem(event, props) {
  var chooseItem = props.chooseItem;

  chooseItem(event.target.dataset);
};

var Option = function Option(props) {
  var value = props.value;
  var index = props.index;
  var mult = props.mult;

  return _react2.default.createElement(
    'div',
    {
      className: 'option',
      'data-name': value.name,
      'data-value': value.value,
      'data-index': index,
      onClick: function onClick(event) {
        return clickItem(event, props);
      }
    },
    _react2.default.createElement(
      'div',
      null,
      value.name
    ),
    value.selected && mult && _react2.default.createElement(
      'div',
      { className: 'selectedOption' },
      '✪'
    )
  );
};

Option.propTypes = {
  value: _react2.default.PropTypes.object.isRequired,
  index: _react2.default.PropTypes.number.isRequired,
  mult: _react2.default.PropTypes.bool.isRequired
};

module.exports = Option;