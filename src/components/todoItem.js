import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class TodoItem extends Component {
  render() {
    return (
      <div style={ style.item }>
        <p style={ style.p }>{ this.props.id }</p>
        <p style={ style.p }>{ this.props.value }</p>
      </div>
    );
  }
}

const style = {
  item: {
    border: '1px solid black',
  },
  p: {
    margin: '5px',
  }
}
