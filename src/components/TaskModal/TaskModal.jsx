import React, { Component } from 'react';
import { BsX } from "react-icons/bs";
import StepsList from '../StepsList/StepsList';

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
        priority: this.props.priority,
        steps: this.props.steps
      },
      confirmOpen: false,
      titleEmpty: this.props.title === '',
      message: ''
    }
  }

  async updateParent(event) {
    if (event) {
      event.stopPropagation();
    }
    this.setState({
      task: {
        id: this.props.id,
        title: this.props.title,
        desc: this.props.desc,
        done: this.props.done,
        priority: this.props.priority,
        steps: this.props.steps
      },
      titleEmpty: false,
      confirmOpen: false,
      message: ''
    });
    this.props.toggleShowTaskModalCallback();
  }

  removeClicked() {
    this.setState({confirmOpen: !this.state.confirmOpen});
  }

  async remove() {
    await this.setState({message: {text: 'Task Removal Successful', type: 'success'}});
    let message = this.state.message;
    await this.props.removeFromTasks(message);
    this.updateParent();
  }

  async saveEdit() {
    if (this.state.task.title !== '') {
      await this.setState({titleEmpty: false, message: {text: 'Task Edit Successful', type: 'success'}});
      let message = this.state.message;
      await this.props.updateTask(this.state.task, message);
      this.updateParent();
    } else { 
      this.setState({titleEmpty: true, message: {text: 'Task Title is Empty', type: 'warning'}});
      this.props.sendPopup({text: 'Task Title is Empty', type: 'warning'});
    }
  }

  async setTitle(title) {
    await this.setState({ 
      task: { ...this.state.task, title: title } 
    });
    
  }

  async setDesc(desc) {
    await this.setState({ 
      task: { ...this.state.task, desc: desc } 
    });
  }

  async setPriority(priority) {
    await this.setState({ 
      task: { ...this.state.task, priority: priority } 
    });
  }

  render() {
    return (
      <div className={this.props.open ? 'task-modal' : 'task-modal modal-hidden'} onClick={this.updateParent.bind(this)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">Edit Task</h2>
            <BsX className="close-modal" onClick={this.updateParent.bind(this)}/>
          </div>
          <div className="modal-body">
            <h4 className="modal-body-title">Title: <input value={this.state.task.title} className={this.state.titleEmpty ? 'title title-empty' : 'title'} name="title" required placeholder="Edit your task's name" onChange={(e) => this.setTitle(e.target.value)}/></h4>
            {this.state.titleEmpty ? <h5 className="modal-body-empty">Task Title is empty</h5> : ''}
            <h4 className="modal-body-priority">Priority: <input value={this.state.task.priority} className="priority" onChange={(e) => this.setPriority(e.target.value)} name="priority" placeholder="0"></input></h4>
            <h4 className="modal-body-description">Description: <textarea value={this.state.task.desc} className="description" onChange={(e) => this.setDesc(e.target.value)} name="desc" placeholder="Edit your task's Description"></textarea></h4>
            <StepsList
              steps={this.state.task.steps}
            >
            </StepsList>
            </div> 
          <div className="modal-footer">
            
            {this.state.confirmOpen
              ? <div className="remove-confirm">
                  <h4>Are you sure you want to remove?</h4> 
                  <button className="button-remove" onClick={this.remove.bind(this)}> Yes </button>
                  <button className="button-deny-remove" onClick={this.removeClicked.bind(this)}> No </button>
                </div>
              : <div>
                  <button className="button-done" onClick={this.saveEdit.bind(this)}> Save </button>
                  <button className="button-remove" onClick={this.removeClicked.bind(this)}> Remove </button>
                </div>
            }
          </div>
        </div>
      </div>
    )
  }
}
