import React, { Component, useState } from 'react';
import { BsX } from "react-icons/bs";

import './AddTaskModal.css';

export default class AddTaskModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open,
      success: false,
      desc: '',
      title: '',
    }
  }

  addTask(event) {
    event.preventDefault();
    const task = {
      id: '1',
      title: this.state.title,
      desc: this.state.desc,
      done: false,
    }
    this.props.addTaskCallback(task);
    this.updateParent();
  }

  updateParent(){
    this.setTitle('');
    this.setDesc('');
    this.props.toggleShowModalCallback(this.props.title);
  }

  setTitle(title) {
    this.setState({ title: title });
  }

  setDesc(desc) {
    this.setState({ desc: desc })
  }

  render() {
    return (
      <div className={this.props.open ? 'modal' : 'modal modal-hidden'}>
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">{this.props.title}</h2>
            <BsX className="close-modal" onClick={this.updateParent.bind(this)}/>
          </div>
          <form onSubmit={this.addTask.bind(this)}>
            <div className="modal-body">
              <div className="form-align">
                <input value={this.state.title} className="title" name="title" required placeholder="Enter your task's name" onChange={(e) => this.setTitle(e.target.value)}/>
                <textarea value={this.state.desc} className="description" onChange={(e) => this.setDesc(e.target.value)} name="desc" placeholder="Enter your task's Description"></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button className="button-add">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
