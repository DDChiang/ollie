import React, { Component } from 'react';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closeModal } from '../actions/modalActions';

@Radium
export class Modal extends Component {
  _handleDefaultAction = (e) => {
    e.stopPropagation();
    this.props.defaultAction();
    this.props.dispatchCloseModal();
  };

  _handleCloseModal = () => {
    this.props.dispatchCloseModal();
  }

  render() {
    return (
      <div style={ style.overlay } onClick={ this._handleCloseModal }>
        <div style={ style.container } onClick={ (e) => { e.stopPropagation(); } }>
          { this.props.children }
          <button onClick={ this._handleDefaultAction }>
            { this.props.defaultActionText }
          </button>
        </div>
      </div>
    );
  }
}

const style = {
  overlay: {
    background: 'rgba(0,0,0,0.2)',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    color: 'blue',
    padding: '20px',
    position: 'absolute',
  },
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatchCloseModal: closeModal,
  }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(Modal);
