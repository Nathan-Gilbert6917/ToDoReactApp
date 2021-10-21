import React, { Component } from 'react';
import { BsX } from "react-icons/bs";

import './TaskModal.css';

export default class TaskModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open,
      success: false,
      task: {
        id: this.props.id,
        title: this.props.title,
        desc: this.props.desc,
        done: this.props.done,
        priority: this.props.priority
      },
      confirmOpen: false
    }
  }

  updateParent() {
    this.props.toggleShowTaskModalCallback();
    this.setState({confirmOpen: false});
  }

  removeClicked() {
    this.setState({confirmOpen: !this.state.confirmOpen});
  }

  remove() {
    this.props.removeFromTasks();
    this.updateParent();
  }

  async setTitle(title) {
    await this.setState({ 
      task: { ...this.state.task, title: title } 
    });
    this.props.updateTask(this.state.task);
  }

  async setDesc(desc) {
    await this.setState({ 
      task: { ...this.state.task, desc: desc } 
    });
    this.props.updateTask(this.state.task);
  }

  async setPriority(priority) {
    await this.setState({ 
      task: { ...this.state.task, priority: priority } 
    });
    this.props.updateTask(this.state.task);
  }

  render() {
    return (
      <div className={this.props.open ? 'task-modal' : 'task-modal modal-hidden'}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">Edit Task</h2>
            <BsX className="close-modal" onClick={this.updateParent.bind(this)}/>
          </div>
          <div className="modal-body">
            <h4>Title: <input value={this.state.task.title} className="title" name="title" required placeholder="Edit your task's name" onChange={(e) => this.setTitle(e.target.value)}/></h4>
            <h4>Priority: <input value={this.state.task.priority} className="priority" onChange={(e) => this.setPriority(e.target.value)} name="priority" placeholder="0"></input></h4>
            <h4>Description: <textarea value={this.state.task.desc} className="description" onChange={(e) => this.setDesc(e.target.value)} name="desc" placeholder="Edit your task's Description"></textarea></h4>
          </div> 
          <div className="modal-footer">
            <button className="button-done" onClick={this.updateParent.bind(this)}> Done </button>
            {this.state.confirmOpen
              ? <div className="remove-confirm">
                  <h4>Are you sure you want to remove?</h4> 
                  <button className="button-remove" onClick={this.remove.bind(this)}> Yes </button>
                  <button className="button-deny-remove" onClick={this.removeClicked.bind(this)}> No </button>
                </div>
              : <button className="button-remove" onClick={this.removeClicked.bind(this)}> Remove </button>
            }
          </div>
        </div>
      </div>
    )
  }
}
