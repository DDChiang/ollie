import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class Modal extends Component {
  render() {
    return (
      <div style={ style.container }>
        { this.props.children }
      </div>
    );
  }
}

const style = {
  container: {
    color: 'blue',
  },
}
