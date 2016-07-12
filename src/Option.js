import React from 'react';
import './style/index.css';

const clickItem = (event, props) => {
  const { chooseItem } = props;
  chooseItem(event.target.dataset);
};

const Option = (props) => {
  const { value, index, mult } = props;
  return (
    <div
      className="option"
      data-name={value.name}
      data-value={value.value}
      data-index={index}
      onClick={(event) => clickItem(event, props)}
    >
      <div>{value.name}</div>
      {
        value.selected && mult &&
          <div className="selectedOption">✪</div>
      }
    </div>
  );
};

Option.propTypes = {
  value: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  mult: React.PropTypes.bool.isRequired
};

module.exports = Option;
