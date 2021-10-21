import React from 'react';
import TaskModal from '../TaskModal/TaskModal.jsx';

import './Task.css';

class Task extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      checked: this.props.done,
      open: false,
    }
  }

  async checkboxClicked() {
    await this.setState({
      checked: !this.state.checked
    });
    let task = {
      id: this.props.id,
      title: this.props.title,
      desc: this.props.desc,
      done: this.state.checked,
      priority: this.props.priority
    }
    this.updateTask(task);
  }

  taskClicked() {
    this.setState({
      open: !this.state.open
    })
  }

  toggleShowTaskModal() {
    this.setState({open: !this.state.open});
  }

  removeFromTasks() {
    this.props.removeFromTasks(this.props.id);
  }

  updateTask(updatedTaskState) {
    this.props.updateTask(updatedTaskState);
  }

  render() { 
    return (
      <div className="task" onClick={this.taskClicked.bind(this)}>
        <input className="checkbox" type="checkbox" checked={this.state.checked} id={this.props.id} onClick={(e) => e.stopPropagation()} onChange={this.checkboxClicked.bind(this)}></input>
        <div className="desc-container">
          {this.state.checked
            ? <i><h4 className="done desc">{this.props.title}</h4></i>
            : <h4 className="desc">{this.props.title}</h4>
          }
        </div>
        <TaskModal 
          open={this.state.open} 
          id={this.props.id} 
          title={this.props.title}
          desc={this.props.desc}
          done={this.props.done}
          priority={this.props.priority}
          toggleShowTaskModalCallback={this.toggleShowTaskModal.bind(this)}
          removeFromTasks={this.removeFromTasks.bind(this)}
          updateTask={this.updateTask.bind(this)}
        />
      </div>
    );
  }
}

export default Task;