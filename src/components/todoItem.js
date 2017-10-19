import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

import { ItemTypes } from '../constants';
import { moveTodo } from '../actions/todoActions';

const todoSource = {
  beginDrag(props) {
    return {
      id: props.id,
      // dataIndex ==> order that todo is mapped in
      index: props.dataIndex,
    }
  }
}

const todoTarget = {
  hover(props, monitor, component) {
    const currTodoIndex = monitor.getItem().index;
    const newTodoIndex = props.dataIndex;

    if (currTodoIndex === newTodoIndex) {
      return;
    }

    // test
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
    if (currTodoIndex < newTodoIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (currTodoIndex > newTodoIndex && hoverClientY > hoverMiddleY) {
      return
    }

    props.dispatchMoveTodo(currTodoIndex, newTodoIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = newTodoIndex;
  }
}

@DropTarget(ItemTypes.TODO, todoTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isHover: monitor.isOver(),
}))
@DragSource(ItemTypes.TODO, todoSource, (connect, monitor) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDragSource: connect.dragSource(),
  // You can ask the monitor about the current drag state
  isDragging: monitor.isDragging(),
}))
@Radium
export class TodoItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,

    // Injected by React DnD
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isHover: PropTypes.func.isRequired,
    dispatchMoveTodo: PropTypes.func.isRequired,
  }

  _handleDelete = () => {
    const {
      id,
    } = this.props;

    this.props.deleteTodo(id);
  }

  _handleEdit = () => {
    const {
      id,
      value,
    } = this.props;

    this.props.triggerEditTodoModal({ id, value });
  }

  render() {
    const {
      id,
      value,
      // test
      connectDropTarget,
      connectDragSource,
      isDragging,
      isHover,
    } = this.props;
    const isDraggingStyle = isDragging ? style.itemDragging : null;
    const isHoverStyle = isHover ? style.itemHover : null;

    return connectDragSource(
      connectDropTarget(
        <div style={ [style.item, isDraggingStyle, isHoverStyle] }>
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
      )
    );
  }
}

const style = {
  item: {
    border: '1px solid black',
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
  }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(TodoItem);
