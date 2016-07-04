import React, { Component } from 'react';
import './style/index.css';

export default class AwesomeSelect extends Component {
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.clickIcon = this.clickIcon.bind(this);
    this.banBlur = this.banBlur.bind(this);
    this.cancelBanBlur = this.cancelBanBlur.bind(this);
    this.chooseItem = this.chooseItem.bind(this);
    this.inputText = this.inputText.bind(this);
    this.state = {
      data: props.data,
      copyData: props.data,
      open: false,
      banBlur: false,
      text: ``,
      style: props.style || {}
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      copyData: nextProps.data,
      text: ``
    });
  }

  onFocus() {
    this.setState({
      open: true
    });
  }

  onBlur() {
    const { banBlur } = this.state;
    if (!banBlur) {
      this.setState({
        open: false
      });
    }
  }

  clickIcon() {
    const { open } = this.state;
    if (open) {
      this.setState({
        open: false
      });
    } else {
      this.refs.select.focus();
    }
  }

  chooseItem(event) {
    const data = event.target.dataset;
    this.props.onChange(data.value, data.name);
    this.setState({
      open: false,
      text: data.name
    });
  }

  banBlur() {
    this.setState({
      banBlur: true
    });
  }

  cancelBanBlur() {
    this.setState({
      banBlur: false
    });
  }

  inputText(event) {
    const { copyData } = this.state;
    const text = event.target.value;
    let filterValue = copyData.filter(element => {
      return (element.name).toLowerCase().match(text.toLowerCase()) !== null;
    });
    if (text === ``) {
      filterValue = copyData;
    }
    this.setState({
      text,
      data: filterValue
    });
  }

  renderOptions() {
    const { data, style } = this.state;
    let optionsWidth = {};
    if (style.width) {
      optionsWidth = Number(style.width.split(`px`)[0]) + 10;
    }
    return (
      <div
        style={{ width: `${optionsWidth}px` }}
        className="optionContainer"
      >
        <div
          className="optionBody"
          onMouseOver={this.banBlur}
          onMouseLeave={this.cancelBanBlur}
        >
          {
            data.map((ele, index) => (
              <div
                key={index}
                className="option"
                data-name={ele.name}
                data-value={ele.value}
                onClick={this.chooseItem}
              >
                {ele.name}
              </div>
            ))
          }
        </div>
        {this.renderFooter()}
      </div>
    );
  }

  renderFooter() {
    const { data } = this.state;
    return (
      <div className="footerOption">
        {data.length} items
      </div>
    );
  }

  render() {
    const { open, text, style } = this.state;
    const defaultStyle = {
      width: `200px`,
      height: `38px`
    };
    const container = {
      border: `1px solid #00bcd4`,
      borderRadius: `${open ? `3px 3px 0 0` : `3px`}`,
      outline: 0,
      padding: `0 5px`
    };
    let iconMarginTop;
    if (style.height) {
      iconMarginTop = (Number(style.height.split(`px`)[0]) - 10) / 2;
    }
    const containerStyle = Object.assign(defaultStyle, style, container);
    const iconStyle = `${open ? `upIcon` : `downIcon`} icon`;
    return (
      <div>
        <div className="container">
          <input
            ref="select"
            type="text"
            style={containerStyle}
            value={text}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.inputText}
          />
          <div
            style={{ marginTop: `${iconMarginTop}px` }}
            className={iconStyle}
            onClick={this.clickIcon}
            onMouseOver={this.banBlur}
            onMouseLeave={this.cancelBanBlur}
          >
          </div>
        </div>
        {open && this.renderOptions()}
      </div>
    );
  }
}

AwesomeSelect.propTypes = {
  data: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired,
  style: React.PropTypes.object
};
