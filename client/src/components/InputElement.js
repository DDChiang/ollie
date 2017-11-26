import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

@Radium
export default class InputElement extends Component {
  constructor(props) {
    super(props);

    this._focusInput = this._focusInput.bind(this);
    this._handleOnChange = this._handleOnChange.bind(this);

    this.state = {
      value: props.value,
    }
  }

  componentDidMount() {
    this._focusInput();
  }

  _focusInput() {
    const {
      autofocus,
      value
    } = this.props;
    const valLength = value.length;

    if (autofocus || autofocus === undefined) {
      this.textInput.focus();
      this.textInput.setSelectionRange(valLength, valLength);
    }
  }

  _handleOnChange(e) {
    const value = e.target.value;

    this.setState({
      value,
    }, this.props.handleChange(value));
  }

  _handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.props.handleEnterPress(this.state.value);
    }
  }

  render() {
    const {
      style,
      type
    } = this.props;

    return (
      <input
        style={ style }
        type={ type }
        value={ this.state.value }
        onChange={ this._handleOnChange }
        onKeyDown={ this._handleKeyDown }
        ref={ (input) => { this.textInput = input; }}
      />
    );
  }
}

InputElement.defaultProps = {
  autofocus: true,
  value: '',
  type: 'text',
};

InputElement.propTypes = {
  autofocus: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.shape({}),
  handleChange: PropTypes.func,
  handleEnterPress: PropTypes.func,
};
