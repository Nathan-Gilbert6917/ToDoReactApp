import React, { Component } from 'react'

import './Step.css';

export default class Step extends Component {

  constructor(props) {
    super(props)

    this.state = {
      id: this.props.id,
      title: this.props.title,
      checked: this.props.checked,
      priority: this.props.priority,
    }
  }

  async checkboxClicked() {
    await this.setState({
      checked: !this.state.checked
    });
    let task = {
      id: this.props.id,
      title: this.props.title,
      checked: this.state.checked,
      priority: this.props.priority
    }
    this.updateTask(task);
  }

  updateTask(updatedTaskState) {
    this.props.updateTask(updatedTaskState);
  }

  stepClicked() {
    console.log('StepClicked');
  }

  render() {
    return (
      <div className="step" onClick={this.stepClicked.bind(this)}>
        <h4>{this.props.id}.</h4>
        <input className="checkbox" type="checkbox" checked={this.state.checked} id={this.props.id} onClick={(e) => e.stopPropagation()} onChange={this.checkboxClicked.bind(this)}></input>
        <div className="title-container">
          {this.state.checked
            ? <i><h4 className="done step-title">{this.props.title}</h4></i>
            : <h4 className="step-title">{this.props.title}</h4>
          }
        </div>
      </div>
    )
  }
}
