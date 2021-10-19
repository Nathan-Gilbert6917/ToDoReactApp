import React, { Component } from 'react';
import { BsX } from "react-icons/bs";

import './TaskModal.css';

export default class TaskModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open,
      success: false,
      desc: '',
      title: '',
    }
  }

  updateParent(){
    this.props.toggleShowTaskModalCallback();
  }

  render() {
    return (
      <div className={this.props.open ? 'modal' : 'modal modal-hidden'}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">{this.props.title}</h2>
            <BsX className="close-modal" onClick={this.updateParent.bind(this)}/>
          </div>
          <div className="modal-body">
            {this.props.desc}
          </div>
          <div className="modal-footer">
            <button className="button-remove">
              Remove
            </button>
          </div>
        </div>
      </div>
    )
  }
}
