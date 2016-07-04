import React, {Component} from 'react';
import cx from 'classnames';
import style from './styles/style.scss'

export default class AwesomeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTheOptions: false,
      inputValue: '',
      chooseValue: '',
      banBlur: false,
      value: props.value,
      copyValue: props.value,
      bottomLabel: props.bottomLabel,
      disabled: props.disabled
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
      copyValue: nextProps.value,
      width: nextProps.width,
      height: nextProps.height,
      disabled: nextProps.value.length > 0 ? nextProps.disabled : true,
      inputValue: ''
    });
  }

  handleShowTheOptions() {
    const { value } = this.props;
    const { disabled } = this.state;
    if (disabled) {
      return;
    }
    if (value.length > 0) {
      this.setState({
        showTheOptions: true
      });
    }
  }

  blue() {
    const { banBlur } = this.state;
    if (!banBlur) {
      this.setState({
        showTheOptions: false
      });
    }

    if(this.props.handleClose) {
      this.props.handleClose();
    }
  }

  // 点击图标的事件
  handleClickIconToShowTheOptions() {
    this.setState({
      showTheOptions: false
    });
    if(this.props.handleClose) {
        this.props.handleClose();
    }
  }

  chooseAnOption(value, index) {
    this.setState({
      inputValue: value.label,
      chooseValue: value.value,
      showTheOptions: false,
      banBlur: false
    });
    this.props.change(value, index);
  }

  // 鼠标在options的时候，禁止失去焦点事件
  mouseEnterOptions() {
    this.setState({
      banBlur: true
    });
  }

  // 鼠标离开options的时候，打开焦点事件
  mouseLeaveOptions() {
    this.setState({
      banBlur: false
    });
  }

  // 搜索功能
  handleChangeInput(e) {
    const { copyValue } = this.state;
    const inputValue = e.target.value;
    let filterValue = copyValue.filter(element => {
      return (element.label).toLowerCase().match(inputValue.toLowerCase()) !== null;
    });
    if (inputValue === '') {
      filterValue = copyValue;
    }
    this.setState({
      inputValue,
      value: filterValue
    });
  }

  // 渲染text
  rendetSelect() {
    const { width } = this.props;
    let { inputValue, disabled } = this.state;
    return (
      <input
        type="text"
        className={cx({
          [style.label]: true,
          [style.disableLabel]: disabled
        })}
        style={{ width: width ? `${(width - 20)}px` : '280px' }}
        placeholder='请选择'
        value={inputValue}
        disabled={disabled}
        onChange={this.handleChangeInput.bind(this)}
        onClick={this.handleShowTheOptions.bind(this)}
        onBlur={this.blue.bind(this)} />
    )
  }

  renderIcon() {
    let {showTheOptions} = this.state;
    let iconType = showTheOptions ? 'fa fa-caret-up' : 'fa fa-caret-down';
    return (
      <div
        className={style.icon}
        onClick={this.handleClickIconToShowTheOptions.bind(this)}>
        <i className={iconType} aria-hidden="true"></i>
      </div>
    )
  }

  // 渲染options
  renderOptions(options) {
    let {width}  = this.props;
    let {showTheOptions} = this.state;
    return (
      <div className={cx({
        [style.optionList]: showTheOptions
      })}
        style={{width: width ? width + 'px' : '304px'}}
        onMouseEnter={this.mouseEnterOptions.bind(this)}
        onMouseLeave={this.mouseLeaveOptions.bind(this)}>
        {
          options.map( (value, index) => {
            return (
              <div
                key={index}
                className={style.rows}
                onClick={this.chooseAnOption.bind(this, value, index)}>
                {value.label}
              </div>
            )
          })
        }
      </div>
    )
  }

  renderLength() {
    let {bottomLabel, width} = this.props;
    let {showTheOptions, value} = this.state;
    return (
      <div
        className={cx({
          [style.optionsLength]: true,
          [style.isShow]: !showTheOptions
        })}
        style={{width: width ? (width - 20) + 'px' : '284px'}}>
        {`共${value.length}条${bottomLabel}`}
      </div>
    )
  }

  render() {
    let {showTheOptions, value} = this.state;
    let {bottomLabel, width, height} = this.props;

    return (
      <div>
        <div
          className={cx({
            [style.container]: true,
            [style.showOptionChangedContainer]: showTheOptions
          })}
          style={{width: width ? `${width}px` : '300px', height: height ? height + 'px' : '40px', lineHeight: height ? height + 'px' : '40px'}}>
          {this.rendetSelect()}
          {this.renderIcon()}
        </div>
        {
          showTheOptions &&
          <div
            className={style.options}
            style={{width: width ? (width + 4) + 'px' : '304px'}}>
            {this.renderOptions(value)}
            {this.renderLength(bottomLabel)}
          </div>
        }
      </div>
    )
  }
}

AwesomeSelect.defaultProps = {
  value: [],
  bottomLabel: ''
}

AwesomeSelect.propTypes = {
  value: React.PropTypes.array.isRequired,
  bottomLabel: React.PropTypes.string.isRequired,
  change: React.PropTypes.func.isRequired,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  disabled: React.PropTypes.bool,
}
