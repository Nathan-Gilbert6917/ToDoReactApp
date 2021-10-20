import React from 'react';
import Task from '../Task/Task.jsx';

import './TaskList.css';

class TaskList extends React.Component {

  removeFromTasks(taskId) {
    this.props.removeFromTasks(taskId);
  }

  updateTask(updatedTaskState) {
    this.props.updateTask(updatedTaskState);
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
                    removeFromTasks={this.removeFromTasks.bind(this)} 
                    updateTask={this.updateTask.bind(this)}
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