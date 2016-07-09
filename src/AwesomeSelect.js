import React, { Component } from 'react';
import _ from 'lodash';
import Option from './Option';
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

    const disposedData = [];
    let placeholderText;
    let text;
    if (props.mult) {
      let selectedNum = props.data.length;
      props.data.forEach(ele => {
        const value = ele;
        if (!value.selected) {
          value.selected = false;
          selectedNum--;
        }
        disposedData.push(value);
      });
      placeholderText = selectedNum;
      text = ``;
    } else {
      const initSelectIndex = _.findIndex(props.data, { selected: true });
      props.data.forEach(ele => {
        const value = ele;
        value.selected = false;
        disposedData.push(value);
      });
      if (initSelectIndex >= 0) {
        disposedData[initSelectIndex].selected = true;
        placeholderText = disposedData[initSelectIndex].name;
        text = placeholderText;
      } else {
        text = ``;
        placeholderText = ``;
      }
    }

    this.state = {
      text,
      placeholderText,
      data: disposedData,
      copyData: disposedData,
      open: false,
      banBlur: false,
      style: props.style || {},
      mult: props.mult || false
    };
  }

  componentWillReceiveProps(nextProps) {
    const disposedData = [];
    let placeholderText;
    let text;
    if (nextProps.mult) {
      let selectedNum = nextProps.data.length;
      nextProps.data.forEach(ele => {
        const value = ele;
        if (!value.selected) {
          value.selected = false;
          selectedNum--;
        }
        disposedData.push(value);
      });
      placeholderText = selectedNum;
      text = ``;
    } else {
      const initSelectIndex = _.findIndex(nextProps.data, { selected: true });
      nextProps.data.forEach(ele => {
        const value = ele;
        value.selected = false;
        disposedData.push(value);
      });
      if (initSelectIndex >= 0) {
        disposedData[initSelectIndex].selected = true;
        placeholderText = disposedData[initSelectIndex].name;
        text = placeholderText;
      } else {
        text = ``;
        placeholderText = ``;
      }
    }

    this.setState({
      text,
      placeholderText,
      data: disposedData,
      copyData: disposedData,
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

  chooseItem(chooseItemData) {
    const { mult, data } = this.state;
    const optionData = chooseItemData;
    if (mult) {
      const tmpData = data;
      let selectedNum = 0;
      tmpData[optionData.index].selected = !tmpData[optionData.index].selected;
      tmpData.forEach(ele => {
        if (ele.selected) {
          selectedNum++;
        }
      });
      this.setState({
        data: tmpData,
        copyData: tmpData,
        placeholderText: selectedNum
      });
      this.props.onChange(optionData.value, optionData.name, _.filter(tmpData, ele => {
        return ele.selected === true;
      }));
      this.refs.select.focus();
    } else {
      this.props.onChange(optionData.value, optionData.name);
      this.setState({
        open: false,
        text: optionData.name
      });
    }
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
    const { data, style, mult } = this.state;
    let optionsWidth = {};
    if (style.width) {
      optionsWidth = Number(style.width.split(`px`)[0]) + 10;
    }
    return (
      <div
        style={{ width: `${optionsWidth}px`, minWidth: `210px` }}
        className="optionContainer"
      >
        <div
          className="optionBody"
          onMouseOver={this.banBlur}
          onMouseLeave={this.cancelBanBlur}
        >
          {
            data.map((ele, index) => (
              <Option
                key={index}
                index={index}
                mult={mult}
                value={ele}
                chooseItem={this.chooseItem}
              />
            ))
          }
        </div>
        {this.renderFooter()}
      </div>
    );
  }

  renderFooter() {
    const { data, copyData } = this.state;
    let numOfSelected = 0;
    copyData.forEach(ele => {
      if (ele.selected) {
        numOfSelected++;
      }
    });
    return (
      <div className="footerOption">
        <div>{data.length} items</div>
        <div>choose {numOfSelected} items</div>
      </div>
    );
  }

  render() {
    const { open, text, style, placeholderText } = this.state;
    const defaultStyle = {
      width: `200px`,
      height: `38px`,
      minWidth: `200px`,
      minHeight: `38px`
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
            placeholder={`choose ${placeholderText} items`}
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
  style: React.PropTypes.object,
  mult: React.PropTypes.bool
};
