import React, { Component } from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

import { ItemTypes } from '../constants';
import {
  deleteTodo,
  moveTodo,
} from '../actions/todoActions';
import {
  setModal,
} from '../actions/modalActions';

const todoSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    }
  },
}

const todoTarget = {
  hover(props, monitor, component) {
    const currIndex = monitor.getItem().index
    const newIndex = props.index

    // Don't replace items with themselves
    if (currIndex === newIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (currIndex < newIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (currIndex > newIndex && hoverClientY > hoverMiddleY) {
      return
    }

    // Time to actually perform the action
    props.dispatchMoveTodo(currIndex, newIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = newIndex
  },
}

@DropTarget(ItemTypes.TODO, todoTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.TODO, todoSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
@Radium
export class TodoItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    // Injected by React DnD
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    moveTodo: PropTypes.func.isRequired,
    dispatchMoveTodo: PropTypes.func.isRequired,
  }

  _handleDelete = () => {
    const {
      id,
      dispatchDeleteTodo,
    } = this.props;

    dispatchDeleteTodo(id);
  }

  _handleEdit = () => {
    const {
      id,
      value,
      dispatchSetModal,
    } = this.props;

    dispatchSetModal('editTodo', {
      id, value
    });
  }

  render() {
    const {
      id,
      value,
      connectDropTarget,
      connectDragSource,
      isDragging,
    } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      connectDropTarget(
        <div style={{ ...style.item, opacity }}>
          <div style={ style.itemContent }>
            <p style={ style.p }>{ id }</p>
            <p style={ style.p }>{ value }</p>
          </div>
          <button
            onClick={ this._handleDelete }
            style={ [style.button, style.deleteButton] }
          >
            Delete
          </button>
          <button
            onClick={ this._handleEdit }
            style={ [style.button, style.editButton] }
          >
            Edit
          </button>
        </div>
      ),
    )
  }
}

const style = {
  item: {
    border: '1px solid yellow',
    padding: '0.5rem 1rem',
    display: 'flex',
    cursor: 'move',
    opacity: 1,
  },
  itemDragging: {
    opacity: 0,
  },
  itemHover: {
    border: '1px solid blue',
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
   background: 'rgba(0,0,0,0.1)',
   width: '50px',
   alignSelf: 'flex-end',
  },
  editButton: {
    background: 'rgba(0,0,0,0.3)',
    width: '50px',
    alignSelf: 'flex-end',
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatchMoveTodo: moveTodo,
    dispatchDeleteTodo: deleteTodo,
    dispatchSetModal: setModal,
  }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(TodoItem);
