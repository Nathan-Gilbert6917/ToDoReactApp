import React from 'react';
import Task from '../Task/Task.jsx';

import './TaskList.css';

class TaskList extends React.Component {

  removeFromTasks(taskId, message) {
    this.props.removeFromTasks(taskId, message);
  }

  updateTask(updatedTaskState, message) {
    this.props.updateTask(updatedTaskState, message);
  }

  sendPopup(message) {
    this.props.sendPopup(message);
  }

  render() { 
    return (
      <div className="taskList">
        <div className="container">
          {this.props.tasks.length > 0
              ? this.props.tasks.map(task => (
                  <Task 
                    key={task.id} 
                    id={task.id} 
                    desc={task.desc} 
                    title={task.title} 
                    done={task.done} 
                    priority={task.priority}
                    steps={task.steps}
                    removeFromTasks={this.removeFromTasks.bind(this)} 
                    updateTask={this.updateTask.bind(this)}
                    sendPopup={this.sendPopup.bind(this)}
                  />
                ))
              : <h4 className="no-tasks">Click the Add button to create a new task</h4>
            }
        </div>
      </div>
    );
  }
}

export default TaskList;