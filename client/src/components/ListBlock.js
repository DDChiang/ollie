import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import {
  Link,
} from 'react-router-dom';

@Radium
export default class ListBlock extends Component {
  render() {
    const { id, name } = this.props.data;

    return (
      <div style={ style.listBlockContainer }>
        <Link
          to={ `todolist/${id}` }
          style={ style.listBlock }
        >
          { name }
        </Link>
      </div>
    );
  }
}

ListBlock.defaultProps = {
  data: {
    id: '',
    name: '',
  },
};

ListBlock.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

const style = {
  listBlockContainer: {
    border: '1px solid blue',
    flex: 1,
    minWidth: '135px',
    minHeight: '48px',
    marginTop: '6px',
    marginBottom: '6px',
  },
  listBlock: {
    cursor: 'pointer',
    background: 'red',
  },
  addListBlock: {
    border: '1px solid grey',
    ':hover': {
      border: '1px solid red',
    },
  }
};
