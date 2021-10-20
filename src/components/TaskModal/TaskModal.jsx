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
        done: this.props.done
      }
    }
  }

  updateParent(){
    this.props.toggleShowTaskModalCallback();
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

  render() {
    return (
      <div className={this.props.open ? 'modal' : 'modal modal-hidden'}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">{this.props.title}</h2>
            <BsX className="close-modal" onClick={this.updateParent.bind(this)}/>
          </div>
          <div className="modal-body">
            <h4>Title: <input value={this.state.task.title} className="title" name="title" required placeholder="Enter your task's name" onChange={(e) => this.setTitle(e.target.value)}/></h4>
            <h4>Description: <textarea value={this.state.task.desc} className="description" onChange={(e) => this.setDesc(e.target.value)} name="desc" placeholder="Enter your task's Description"></textarea></h4>
          </div>
          <div className="modal-footer">
            <button className="button-remove" onClick={this.remove.bind(this)}>
              Remove
            </button>
          </div>
        </div>
      </div>
    )
  }
}
