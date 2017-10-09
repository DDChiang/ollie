import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class TodoItem extends Component {
  handleDelete = () => {
    const {
      id,
    } = this.props;

    this.props.deleteTodo(id);
  }

  render() {
    const {
      id,
      value,
    } = this.props;

    return (
      <div style={ style.item }>
        <div style={ style.itemContent }>
          <p style={ style.p }>{ id }</p>
          <p style={ style.p }>{ value }</p>
        </div>
        <button
          onClick={ this.handleDelete }
          style={ [style.button, style.deleteButton] }
        >
          Delete
        </button>
        <button
          onClick={ this.handleEdit }
          style={ [style.button, style.editButton] }
        >
          Edit
        </button>
      </div>
    );
  }
}

const style = {
  item: {
    border: '1px solid black',
    display: 'flex',
  },
  itemContent: {
    alignSelf: 'flex-start',
  },
  p: {
    margin: '5px',
  },
  button: {
    float: 'right',
  },
  deleteButton: {
   background: 'red',
   width: '50px',
   alignSelf: 'flex-end',
  },
  editButton: {
    background: 'green',
    width: '50px',
    alignSelf: 'flex-end',
  }
}
