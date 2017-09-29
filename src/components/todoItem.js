import React, { Component } from 'react';

export default class TodoItem extends Component {
  render() {
    return (
      <div>
        <p>{ this.props.id }</p>
        <p>{ this.props.value }</p>
      </div>
    );
  }
}
