import React, { Component } from 'react';
import { BsX } from "react-icons/bs";
import _uniqueId from 'lodash/uniqueId';

import './AddTaskModal.css';

export default class AddTaskModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open,
      success: false,
      desc: '',
      title: '',
      priority: 0
    }
  }

  guidGenerator() {
    const S4 = function() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

  addTask(event) {
    event.preventDefault();
    const task = {
      id: '',
      title: this.state.title,
      desc: this.state.desc,
      done: false,
      priority: this.state.priority
    }
    task.id = _uniqueId(this.guidGenerator());
    this.props.addTaskCallback(task);
    this.updateParent();
  }

  updateParent(){
    this.setTitle('');
    this.setDesc('');
    this.setPriority('');
    this.props.toggleShowModalCallback(this.props.title);
  }

  setTitle(title) {
    this.setState({ title: title });
  }

  setDesc(desc) {
    this.setState({ desc: desc })
  }

  setPriority(priority) {
    this.setState({ priority: priority });
  }

  render() {
    return (
      <div className={this.props.open ? 'add-modal' : 'add-modal modal-hidden'} onClick={this.updateParent.bind(this)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">{this.props.title}</h2>
            <BsX className="close-modal" onClick={this.updateParent.bind(this)}/>
          </div>
          <form onSubmit={this.addTask.bind(this)}>
            <div className="modal-body">
              <div className="form-align">
                <input value={this.state.title} className="title" name="title" required placeholder="Enter your task's Name" onChange={(e) => this.setTitle(e.target.value)}/>
                <div className="priority-container">
                  <label>Enter your task's Priority:</label><input type="number" value={this.state.priority} className="priority" name="priority" placeholder="0" onChange={(e) => this.setPriority(e.target.value)}/>
                </div>
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
